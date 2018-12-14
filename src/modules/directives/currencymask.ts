import { Directive, Attribute, HostListener, ElementRef, ViewContainerRef } from '@angular/core';
import { NgModel } from '@angular/forms';
import { FieldType } from '@ngx-formly/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Directive({
	selector: '[appCurrencyMask]',
	providers: [ NgModel ]
})
export class CurrencyMaskDirective implements OnInit {
	viewValue: string;
	oldValue: string;
	regex = new RegExp(/^[0-9]+([,.][0-9]+)?$/g);
	model: any;
	field: any;
	constructor(public cmodel: NgModel, public el: ElementRef, private vcRef: ViewContainerRef) {}

	ngOnInit() {
		const Component = this.vcRef['_view']['component'];
		this.model = Component['model'];
		this.field = Component['field'];
		this.format();
	}

	format() {
		let value ='';
		if(this.model[this.field.templateOptions['key']]){
			value=this.model[this.field.templateOptions['key']];
		}else {
			value=this.model[this.field.templateOptions['objectName']][this.field.templateOptions['fieldName']];
		}
	
		if (value && value.toString().length > 0) {
			const v = '$ ' + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
			this.cmodel.valueAccessor.writeValue(v);
			this.oldValue = v;
		}
	}

	@HostListener('blur', [ '$event' ])
	onBlur() {
		if (this.el.nativeElement.value.length > 0) {
			const nvalue = this.el.nativeElement.value.replace(/,/g, '').replace('$ ', '');
			const v = '$ ' + parseFloat(nvalue).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
			this.viewValue = v;
			this.cmodel.valueAccessor.writeValue(this.viewValue);
			if(this.model[this.field.templateOptions['key']]){
				this.model[this.field.templateOptions['key']]=nvalue;
			} else {
				this.model[this.field.templateOptions['objectName']][this.field.templateOptions['fieldName']] = nvalue;
			}
			
		}
	}

	@HostListener('input', [ '$event' ])
	inputHandler() {
		const nvalue = this.el.nativeElement.value;
		const newValue = nvalue.split('.')[0].replace(/,/g, '').replace('$ ', '');
		let isvalid = true;
		if (nvalue.split('.').length > 1 && nvalue.split('.')[1].length > 2) {
			isvalid = false;
		}
		if (newValue.length > 0 && newValue.length < 16 && newValue.match(this.regex) && isvalid) {
			let afercomma = '';
			if (nvalue.split('.').length > 1) {
				if (nvalue.split('.')[1].length > 0) {
					afercomma = '.' + nvalue.split('.')[1];
				} else {
					afercomma = '.';
				}
			}
			const v = this.Comma(newValue) + afercomma;
			this.viewValue = '$ ' + v;
			this.cmodel.viewToModelUpdate(newValue);
			this.cmodel.valueAccessor.writeValue(this.viewValue);
		} else if (newValue.length > 0) {
			this.cmodel.valueAccessor.writeValue(this.oldValue);
		} else {
			this.cmodel.viewToModelUpdate('');
			this.cmodel.valueAccessor.writeValue('');
		}
	}

	@HostListener('keydown', [ '$event' ])
	onKeyDown(e: Event) {
		this.oldValue = this.el.nativeElement.value;
	}

	Comma(Num) {
		Num += '';
		Num = Num.replace(',', '');
		Num = Num.replace(',', '');
		Num = Num.replace(',', '');
		Num = Num.replace(',', '');
		Num = Num.replace(',', '');
		Num = Num.replace(',', '');
		const x = Num.split('.');
		let x1 = x[0];
		const x2 = x.length > 1 ? '.' + x[1] : '';
		const rgx = /(\d+)(\d{3})/;
		while (rgx.test(x1)) {
			x1 = x1.replace(rgx, '$1' + ',' + '$2');
		}
		return x1 + x2;
	}
}
