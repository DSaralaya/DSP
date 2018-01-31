import { Component, OnInit } from '@angular/core';
import { LocalService } from 'app/services/localJson.service';
import { FormGroup } from '@angular/forms';
import { ValidationService } from 'app/services/validation.service';
import { Router } from '@angular/router';
import { config } from 'ngx-mask/build/config';
import { SharedModel } from 'app/shared/sharedmodel.component';

@Component({
	selector: 'app-personal-info',
	templateUrl: '../shared/sharedmodel.component.html',
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
