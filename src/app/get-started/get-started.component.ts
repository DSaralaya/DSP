import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SharedModel } from '../shared/components/sharedmodel.component';
import { LocalService } from '../shared/services/localJson.service';

@Component({
	selector: 'app-get-started',
	templateUrl: './get-started.component.html',
	styleUrls: [ './get-started.component.css' ]
})
export class GetStartedComponent extends SharedModel implements OnInit {
	constructor(public service: LocalService, public router: Router) {
		super(service, router);
	}
	ngOnInit() {
		this.getAppFields('get-started');
	}
}
