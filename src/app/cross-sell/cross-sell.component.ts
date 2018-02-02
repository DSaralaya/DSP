import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedModel } from '../shared/components/sharedmodel.component';
import { LocalService } from '../shared/services/localJson.service';

@Component({
	selector: 'app-cross-sell',
	templateUrl: '../shared/components/sharedmodel.component.html',
	styleUrls: [ 'cross-sell.component.less' ]
})
export class CrossSellComponent extends SharedModel implements OnInit {
	public pageTitle = 'Cross Sell';
	constructor(public service: LocalService, public router: Router) {
		super(service, router);
	}

	ngOnInit() {
		this.getAppFields('cross-sell');
	}
}
