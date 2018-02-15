import { OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions } from '@ngx-formly/core';
import { Router } from '@angular/router';
import { LocalService } from '../services/localJson.service';
import { AppConfig } from '../common/config';
import { ValidationService } from '../services/validation.service';
import { PersonalInfoComponent } from '../../personal-info/personal-info.component';

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
		this.service.callExternalMethod('getAppFields', parms).subscribe((result: any[]) => {
			this.fields = typeof result['fields'] === 'object' ? result['fields'] : JSON.parse(result['fields']);
			this.pageFlow = typeof result['pageflow'] === 'object' ? result['pageflow'] : JSON.parse(result['pageflow']);
			this.model = result['model'];
			console.log(this.nextUrl);
			this.nextUrl = AppConfig.NextPage(this.pageFlow, pagename);
			this.prevUrl = AppConfig.PrevPage(this.pageFlow, pagename);
			// ValidationService.orgModel = this.model;
		});
	}

	submit(url) {
		this.options.formState.submitted = true;
		if (this.form.valid) {
			console.log(this.model);
			const domain = document.location.hostname.indexOf('localhost') >= 0 ? 'local' : 'remote';
			if (domain !== 'local') {
				const parms = {};
				parms['id'] = window['DSP']['id'];
				parms['Identity_Information__c'] = JSON.stringify(this.model['Identity_Information__c']);
				parms['Employment_Information__c'] = JSON.stringify(this.model['Employment_Information__c']);
				parms['Application__c'] = JSON.stringify(this.model['Application__c']);
				parms['About_Account__c'] = JSON.stringify(this.model['About_Account__c']);
				debugger;
				this.service.callExternalMethod('saveAppFields', parms).subscribe((result) => {
					this.router.navigateByUrl('/form/' + this.nextUrl);
				});
			} else {
				this.router.navigateByUrl('/form/' + this.nextUrl);
			}
		}
	}

	toTitleCase(str) {
		return str.replace(/\w\S*/g, function(txt) {
			return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
		});
	}
}
