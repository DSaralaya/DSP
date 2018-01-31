import { Component, OnInit } from '@angular/core';
import { SharedModel } from 'app/shared/sharedmodel.component';
import { LocalService } from 'app/services/localJson.service';
import { Router } from '@angular/router';

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
