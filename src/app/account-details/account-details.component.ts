import { Component, OnInit } from '@angular/core';
import { SharedModel } from 'app/shared/sharedmodel.component';
import { LocalService } from 'app/services/localJson.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-account-details',
	templateUrl: '../shared/sharedmodel.component.html',
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
