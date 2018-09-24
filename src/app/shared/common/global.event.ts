
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions } from '@ngx-formly/core';
import { Router } from '@angular/router';
import { LocalService } from '../services/localJson.service';
import { AppConfig } from '../common/config';


export class GlobalEvent {
	public pageTitle = '';
	public model: any;
	public fields: any;
	public currentIndex=0;
	public totalPages=0;
	pageFlow: any;
	pageName: any;
	form = new FormGroup({});
	public nextUrl = '';
	public prevUrl = '';
	options: FormlyFormOptions = { formState: { submitted: false } };

	constructor(public service: LocalService, public router: Router) {}

	getAppFields(pagename) {
		this.pageTitle = this.toTitleCase(pagename.replace('-', ' '));
		const parms = {};
		parms['id'] = window['DSP'] ? window['DSP']['id'] : ''; // this.subProdCode;
		parms['pageName'] = pagename;
		this.pageName = pagename;
		this.service.callExternalMethod('getAppFields', parms).subscribe((result) => {
			if(result.fields!='' && typeof(result.fields)==='string'){
				this.fields =JSON.parse(result.fields);
			} else if(result.fields!='') {
				this.fields =result.fields;
			}
			
			this.model = result.model?result.model:result;
			if(this.model.fields){
				delete this.model.fields;
			}
			var currPage = AppConfig.CurrentPage(this.model);
			if(this.model['pageList']!='') {
				this.totalPages=this.model['pageList'].split(',').length;
				this.currentIndex=this.model['pageList'].split(',').indexOf(currPage)+1;
			}
			this.nextUrl = AppConfig.NextPage(this.model);
			this.prevUrl = AppConfig.PrevPage(this.model);
		});
	}

	submit(url) {
		debugger;
		this.options.formState.submitted = true;
		if (this.form.valid) {
			console.log(this.model);
			const domain = document.location.hostname.indexOf('localhost') >= 0 ? 'local' : 'remote';
			if (domain !== 'local') {
				const parms = {};
				var model=this.model;
				for (var k in model) {
					model[k]=JSON.stringify(model[k]);
				}
				//debugger;
				this.service.callExternalMethod('saveAppFields', model).subscribe((result) => {
					this.router.navigateByUrl(this.nextUrl);
				});
			} else {
				this.router.navigateByUrl(this.nextUrl);
			}
		}
	}

	toTitleCase(str) {
		return str.replace(/\w\S*/g, function(txt) {
			return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
		});
	}
}
