import { Component, OnInit } from '@angular/core';
import { ControlProperties, ChildControls } from './controlproperties';
import { FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { FieldLogicList } from './fieldLogic';
import { NgProgress } from '@ngx-progressbar/core';
import { SimpleModalService } from 'ngx-simple-modal';
import { UiPropertiesModalComponent } from './ui-properties.component';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalService } from '../shared/services/localJson.service';
import { AppConfig } from '../shared/common/config';

@Component({
	selector: 'app-ui-form',
	templateUrl: './ui-form.component.html',
	styleUrls: [ './ui-form.component.css' ]
})
export class UiFormComponent implements OnInit {
	controls = [
		{ name: 'section', type: 'section', dspname: 'section', template: '<h4>section</h4>', id: 0, controls: [], className: 'col-xs-8 col-sm-8 col-md-10 col-lg-10 inline-section-header' },
		{ name: 'input', type: 'htmlcontrol', dataType: 'input', className: 'col-sm-6', dspname: 'input', id: 0, label: 'input', channel: 'online' },
		{ name: 'select', type: 'htmlcontrol', dataType: 'select', className: 'col-sm-6', dspname: 'select', id: 0, label: 'select', channel: 'online' },
		{ name: 'checkbox', type: 'htmlcontrol', dataType: 'checkbox', className: 'col-sm-6', dspname: 'checkbox', id: 0, label: 'checkbox', channel: 'online' },
		{ name: 'radio button', type: 'htmlcontrol', dataType: 'ssn', className: 'col-sm-6', dspname: 'ssn', id: 0, label: 'ssn', channel: 'online' },
		{ name: 'phone', type: 'htmlcontrol', dataType: 'phone', className: 'col-sm-6', dspname: 'phone', id: 0, label: 'phone', channel: 'online' },
		{ name: 'zipcode', type: 'htmlcontrol', dataType: 'zipcode', className: 'col-sm-6', dspname: 'zipcode', id: 0, label: 'zipcode', channel: 'online' },
		{ name: 'currency', type: 'htmlcontrol', dataType: 'currency', className: 'col-sm-6', dspname: 'currency', id: 0, label: 'currency', channel: 'online' },
		{ name: 'output', type: 'htmlcontrol', dataType: 'output', className: 'col-sm-6', dspname: 'output', id: 0, label: 'output', channel: 'online' },
		{ name: 'read-only', type: 'htmlcontrol', dataType: 'read-only', className: 'col-sm-6', dspname: 'read-only', id: 0, label: 'read-only', channel: 'online' },
		{ name: 'DL Scan', type: 'htmlcontrol', dataType: 'dlscan', className: 'col-sm-6', dspname: 'dlscan', id: 0, label: 'dlscan', channel: 'online' }
	];
	tabs = [ { name: 'Code', class: 'active' }, { name: 'Preview Code', class: '' }, { name: 'Paste Json', class: '' } ];
	count = 1;
	droppedControls: ControlProperties[] = [];
	properties: any;
	formlyField: any = [];
	public fields: any;
	public model: any = {
		Application__c: {},
		Employment_Information__c: {},
		Identity_Information__c: {},
		About_Account__c: {}
	};
	pageTitle: any = '';
	form = new FormGroup({});
	downLoadUrl: any;
	pastedJSON: any;
	fileName: any;
	formlyJson: any;
	subProdCode: any;
	domain: any;
	constructor(private sanitizer: DomSanitizer, private progress: NgProgress, private SimpleModalService: SimpleModalService, private route: ActivatedRoute, public service: LocalService, private router: Router) {}

	ngOnInit() {
		this.pageTitle = this.route.snapshot.queryParams['page'];
		this.subProdCode = this.route.snapshot.queryParams['subProd'];
		this.domain = AppConfig.getDomain();
		if (!this.subProdCode || this.subProdCode.length === 0) {
			this.router.navigate([ '/ui-start' ]);
		} else {
			this.onPageLoadGetJson();
		}
		setTimeout(() => {
			this.progress.done();
		}, 100);
	}

	onControlDrop(e: any) {
		this.count++;
		const obj2 = Object.assign({}, e.dragData);
		obj2.id = this.count;
		obj2.controls = [];
		this.droppedControls.push(obj2);
	}

	onChildDrop(e: any, index) {
		if (e.dragData && e.dragData.type === 'htmlcontrol') {
			this.count++;
			const obj2 = Object.assign({}, e.dragData);
			obj2.id = this.count;
			this.droppedControls[index].controls.push(obj2);
		}
	}

	getProperty(item, $event) {
		this.SimpleModalService.addModal(
			UiPropertiesModalComponent,
			{ properties: item },
			{
				closeOnEscape: false,
				closeOnClickOutside: false
			}
		);
	}
	makeActive(index) {
		for (let i = 0; i < this.tabs.length; i++) {
			if (index === i) {
				this.tabs[i]['class'] = 'active';
			} else {
				this.tabs[i]['class'] = '';
			}
		}
		this.ConvertToFormly(index);
	}

	ConvertToFormly(index) {
		this.formlyField = [];
		if (index === 1) {
			this.droppedControls.forEach((item) => {
				const header = {
					template: item.template,
					className: item.className
				};
				if (item.sectionName) {
					header['data'] = {
						sectionType: item.sectionName
					};
				}
				const section = {
					wrappers: 'section',
					fieldGroupClassName: 'row',
					fieldGroup: []
				};
				item.controls.forEach((child) => {
					const field = {
						key: child.dspname,
						type: child.dataType,
						className: child.className,
						channel: child.channel,
						templateOptions: {
							label: child.label,
							required: child.required,
							objectName: child.objectName,
							fieldName: child.fieldName
						}
					};
					if (child.defaultValue) {
						field['defaultValue'] = child.defaultValue;
					}
					if (child.expressionProperties) {
						field['expressionProperties'] = child.expressionProperties;
					}
					if (child.hideExpression) {
						field['hideExpression'] = child.hideExpression;
					}
					if (child.data) {
						field['data'] = child.data;
					}
					if (child.picklist) {
						const values = child.picklist.split(';');
						const options = [];
						values.forEach((val) => {
							options.push({ label: val, value: val });
						});
						field['templateOptions']['options'] = options;
					}
					section.fieldGroup.push(field);
				});
				this.formlyField.push(header);
				this.formlyField.push(section);
			});
			this.fields = JSON.parse(JSON.stringify(this.formlyField));
		}
		if (index === 2) {
			this.pastedJSON = JSON.stringify(this.droppedControls, null, 2);
		}
	}
	saveWork(checked) {
		this.ConvertToFormly(1);
		this.saveToFileSystem(JSON.stringify(this.formlyField, null, 2), checked);
	}
	finish() {
		const sales = new FieldLogicList();
		sales.genrateFieldLogic(this.droppedControls);
	}

	removeChild(k, x) {
		this.droppedControls[k].controls.splice(x, 1);
	}

	remove(k) {
		this.droppedControls.splice(k, 1);
	}
	loadPastedJson() {
		this.droppedControls = JSON.parse(this.pastedJSON);
	}

	private saveToFileSystem(response, checked) {
		if (response !== '[]' && this.pageTitle.length > 0) {
			const parms = {};
			parms['json'] = response;
			parms['subProductCode'] = this.subProdCode;
			parms['pageName'] = this.pageTitle;

			if (this.domain !== 'local') {
				if (!checked) {
					this.service.callExternalMethod('saveFormFields', parms).subscribe((result) => {
						this.goBack();
					});
				} else {
					const r = confirm('Are you sure to update or insert into all subproduct?');
					if (r) {
						this.service.callExternalMethod('applyToAllSubProducts', parms).subscribe((result) => {
							this.goBack();
						});
					}
				}
			} else {
				this.goBack();
			}
		}
	}

	onPageLoadGetJson() {
		if (this.domain !== 'local') {
			const parms = {};
			parms['subProductCode'] = this.subProdCode;
			parms['pageName'] = this.pageTitle;
			this.service.callExternalMethod('getAppFields', parms).subscribe((result) => {
				this.formlyJson = result['fields'];
				this.convertFormlyJsonToDrop();
			});
		}
	}

	convertFormlyJsonToDrop() {
		const jsonData = JSON.parse(this.formlyJson);
		this.droppedControls = [];
		let section: ControlProperties;
		jsonData.forEach((item) => {
			if (item.template) {
				section = {
					sectionName: item.data ? item.data.sectionType : '',
					template: item.template,
					name: 'section',
					className: item.className,
					controls: []
				};
			}
			if (item.fieldGroup) {
				item.fieldGroup.forEach((child) => {
					const field: ChildControls = {
						dspname: child.key,
						name: child.type,
						type: child.type,
						dataType: child.type,
						required: child.templateOptions.required,
						label: child.templateOptions.label,
						className: child.className,
						objectName: child.templateOptions.objectName,
						fieldName: child.templateOptions.fieldName,
						hideExpression: child.hideExpression,
						data: child.data,
						defaultValue: child.defaultValue,
						expressionProperties: child.expressionProperties,
						channel: child.channel ? child.channel : 'online'
					};
					if (child.templateOptions['options']) {
						let str = '';
						let count = 0;
						child.templateOptions['options'].forEach((element) => {
							if (element.value !== '' && count !== 0) {
								str += ';' + element.value;
								count++;
							} else if (element.value !== '') {
								str += element.value;
								count++;
							}
						});
						field.picklist = str;
					}
					section.controls.push(field);
				});
			}
			if (section && section.controls.length > 0) {
				this.droppedControls.push(section);
			}
		});
	}

	removeClassNames(cls) {
		const elements = document.querySelectorAll(cls);
		elements.forEach((ele) => {
			ele.classList.remove(cls.replace('.', ''));
		});
	}
	goBack() {
		this.router.navigateByUrl('/ui-start/' + this.subProdCode);
	}
}
