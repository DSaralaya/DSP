import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { config } from 'ngx-mask/build/config';
import { SharedModel } from '../shared/components/sharedmodel.component';
import { LocalService } from '../shared/services/localJson.service';

@Component({
	selector: 'app-personal-info',
	templateUrl: '../shared/components/sharedmodel.component.html',
	styleUrls: [ './personal-info.component.css' ]
})
export class PersonalInfoComponent extends SharedModel implements OnInit {
	public pageTitle = 'Personal Information';

	constructor(public service: LocalService, public router: Router) {
		super(service, router);
	}

	ngOnInit() {
		this.getAppFields('personal-info');
	}
}
