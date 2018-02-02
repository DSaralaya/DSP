import { Component, OnInit } from '@angular/core';
import { SharedModel } from '../shared/components/sharedmodel.component';
import { Router } from '@angular/router';
import { LocalService } from '../shared/services/localJson.service';

@Component({
	selector: 'app-review-submit',
	templateUrl: '../shared/components/sharedmodel.component.html',
	styleUrls: [ './review-submit.component.less' ]
})
export class ReviewSubmitComponent extends SharedModel implements OnInit {
	public pageTitle = 'Review Submit';
	constructor(public service: LocalService, public router: Router) {
		super(service, router);
	}

	ngOnInit() {
		this.getAppFields('review-submit');
	}
}
