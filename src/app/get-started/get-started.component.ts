import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { ValidationService } from '../services/validation.service';
import { LocalService } from 'app/services/localJson.service';
import { Router } from '@angular/router';
import { SharedModel } from 'app/shared/sharedmodel.component';

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
