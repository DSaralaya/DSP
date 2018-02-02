import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SharedModel } from '../shared/components/sharedmodel.component';
import { LocalService } from '../shared/services/localJson.service';

@Component({
	selector: 'app-confirmation',
	templateUrl: './confirmation.component.html',
	styleUrls: [ './confirmation.component.less' ]
})
export class ConfirmationComponent extends SharedModel implements OnInit {
	public pageTitle = 'Confirmation';

	constructor(public service: LocalService, public router: Router) {
		super(service, router);
	}

	ngOnInit() {
		this.getAppFields('confirmation');
	}
}
