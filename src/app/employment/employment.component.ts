import { Component, OnInit } from '@angular/core';
import { SharedModel } from '../shared/components/sharedmodel.component';
import { LocalService } from '../shared/services/localJson.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-employment',
	templateUrl: '../shared/components/sharedmodel.component.html',
	styleUrls: [ './employment.component.less' ]
})
export class EmploymentComponent extends SharedModel implements OnInit {
	public pageTitle = 'Employment';
	constructor(public service: LocalService, public router: Router) {
		super(service, router);
	}

	ngOnInit() {
		this.getAppFields('employment');
	}
}
