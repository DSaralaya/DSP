import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LocalService } from '../shared/services/localJson.service';
import { GlobalEvent } from '../shared/common/global.event';

@Component({
	selector: 'app-confirmation',
	templateUrl: './confirmation.component.html',
	styleUrls: [ './confirmation.component.less' ]
})
export class ConfirmationComponent extends GlobalEvent implements OnInit {
	public pageTitle = 'Confirmation';

	constructor(public service: LocalService, public router: Router) {
		super(service, router);
	}

	ngOnInit() {
		this.getAppFields('confirmation');
	}
}
