import { OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions } from '@ngx-formly/core';
import { Router } from '@angular/router';
import { LocalService } from '../services/localJson.service';
import { AppConfig } from '../common/config';
import { ValidationService } from '../services/validation.service';

export class SharedModel {
	public pageTitle = '';
	public model: any;
	public fields: any;
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
			if(typeof(result.fields)==='string'){
				this.fields =JSON.parse(result.fields);
			} else {
				this.fields =result.fields;
			}
			
			this.model = result;
			delete this.model.fields;
			//this.nextUrl = AppConfig.NextPage(this.model);
			//this.prevUrl = AppConfig.PrevPage(this.model);
		});
	}

	submit(url) {
		//debugger;
		this.options.formState.submitted = true;
		if (this.form.valid) {
			console.log(this.model);
			const domain = document.location.hostname.indexOf('localhost') >= 0 ? 'local' : 'remote';
			if (domain !== 'local') {
				const parms = {};
				//debugger;
				this.service.callExternalMethod('saveAppFields', parms).subscribe((result) => {
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
