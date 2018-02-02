import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyConfig } from '@ngx-formly/core/src/services/formly.config';
import { FormlyFormOptions } from '@ngx-formly/core';
import { Router } from '@angular/router';
import { SharedModel } from '../shared/components/sharedmodel.component';
import { LocalService } from '../shared/services/localJson.service';

@Component({
	selector: 'app-identity',
	templateUrl: '../shared/components/sharedmodel.component.html',
})
export class IdentityComponent extends SharedModel implements OnInit {
	public pageTitle = 'Identity';
	private navigateUrl = 'employement';

	constructor(public service: LocalService, public router: Router) {
		super(service, router);
	}

	ngOnInit() {
		this.getAppFields('identity');
	}
}
