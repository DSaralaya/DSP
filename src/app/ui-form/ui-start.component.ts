import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalService } from '../shared/services/localJson.service';

@Component({
	selector: 'app-ui-start',
	templateUrl: './ui-start.component.html'
})
export class UiStartComponent implements OnInit {
	subProductList: any = [];
	pageList: any = [];
	newPageName: any;
	selectedSubProduct: any;
	constructor(public service: LocalService, public router: Router) {}
	ngOnInit() {
		this.getProductList();
	}

	getProductList() {
		this.service.callExternalMethod('getAllSubProducts', []).subscribe((result) => {
			this.subProductList = result;
		});
		// this.subProductList = [ { name: 'Credit Card Gold', value: 'CCG' }, { name: 'Credit Card Silver', value: 'CCS' } ];
	}

	setFlowPage() {
		var parms = [];
		parms.push({ json: '{ "skipPrevPage":"CrossSellPage","skipNextPage":"AccountDetailsPage" }' });
		parms.push({ subProductCode: 'CCS' });
		parms.push({ pageName: 'CCS-pageflow' });
		this.service.callExternalMethod('saveAppFields', parms).subscribe((result) => {
			alert('success');
		});
		// this.subProductList = [ { name: 'Credit Card Gold', value: 'CCG' }, { name: 'Credit Card Silver', value: 'CCS' } ];
	}

	getPages(select) {
		// this.pageList = [ 'get-started', 'cross-sell', 'identity' ];
		this.service.callExternalMethod('getPageNamesBySubProduct', [ select.value ]).subscribe((result) => {
			this.pageList = result;
			this.setFlowPage();
		});
	}

	add(input) {
		if (input.value.length > 0) {
			this.pageList.push({ name: input.value });
		}
	}

	edit(index) {
		console.log(index);
	}

	delete(index) {
		debugger;
		this.pageList.splice(index, 1);
	}
}
