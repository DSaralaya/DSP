import { Component, OnInit } from '@angular/core';
import { SharedModel } from '../shared/components/sharedmodel.component';
import { LocalService } from '../shared/services/localJson.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-account-details',
	templateUrl: '../shared/components/sharedmodel.component.html',
	styleUrls: [ './account-details.component.less' ]
})
export class AccountDetailsComponent extends SharedModel implements OnInit {
	public pageTitle = 'Account Details';

	constructor(public service: LocalService, public router: Router) {
		super(service, router);
	}

	ngOnInit() {
		this.getAppFields('account-details');
	}
}
