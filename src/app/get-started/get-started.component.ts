import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalService } from '../shared/services/localJson.service';
import { GlobalEvent } from '../shared/common/global.event';

@Component({
	selector: 'app-get-started',
	templateUrl: './get-started.component.html',
	styleUrls: [ './get-started.component.css' ]
})
export class GetStartedComponent extends GlobalEvent implements OnInit {
	constructor(public service: LocalService, public router: Router) {
		super(service, router);
	}
	ngOnInit() {
		debugger;
		this.getAppFields('get-started');
	}
}
