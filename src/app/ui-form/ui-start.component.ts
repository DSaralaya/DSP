import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalService } from '../shared/services/localJson.service';
import { NgProgress } from '@ngx-progressbar/core';

@Component({
	selector: 'app-ui-start',
	templateUrl: './ui-start.component.html'
})
export class UiStartComponent implements OnInit {
	subProductList: any = [];
	sortoptions: any;
	pageList: any = [];
	newPageName: any;
	selectedSubProduct: any;
	isupdate = 'hidden';
	constructor(public service: LocalService, private progress: NgProgress, public router: Router, private route: ActivatedRoute) {}
	ngOnInit() {
		this.getProductList();
		this.initSort();
		setTimeout(() => {
			this.progress.done();
		}, 100);
	}

	getProductList() {
		const subpProd = this.route.snapshot.params['id'];
		const domain = document.location.hostname.indexOf('localhost') >= 0 ? 'local' : 'remote';
		if (domain === 'local') {
			this.subProductList = [ { Sub_Product__c: 'Credit Card Gold', Sub_Product_Code__c: 'CCG' }, { Sub_Product__c: 'Credit Card Silver', Sub_Product_Code__c: 'CCS' } ];
			if (subpProd) {
				this.selectedSubProduct = subpProd;
				this.getPages(this.selectedSubProduct);
			}
		} else {
			this.service.callExternalMethod('getAllSubProducts', {}).subscribe((result) => {
				this.subProductList = result;
				if (subpProd) {
					this.selectedSubProduct = subpProd;
					this.getPages(this.selectedSubProduct);
				}
			});
		}
	}

	getPages(select) {
		const domain = document.location.hostname.indexOf('localhost') >= 0 ? 'local' : 'remote';
		if (domain === 'local') {
			this.pageList = [ { name: 'cross-sell' }, { name: 'identity' } ];
		} else {
			const params = {};
			params['subProductCode'] = select;
			this.service.callExternalMethod('getPageNamesBySubProduct', params).subscribe((result: any[]) => {
				debugger;
				if (result.length > 0) {
					result.forEach((element) => {
						this.pageList.push({ name: element['path'] });
					});
				}
			});
		}
	}
	initSort() {
		this.sortoptions = {
			onUpdate: (event: any) => {
				this.isupdate = '';
			}
		};
	}

	setFlowPage(): void {
		this.isupdate = 'hidden';
		const pageflow = [];
		this.pageList.forEach((element, index) => {
			const prev = this.pageList[index - 1] ? this.pageList[index - 1]['name'] : '';
			const next = this.pageList[index + 1] ? this.pageList[index + 1]['name'] : '';
			pageflow.push({ path: element['name'], prevPage: prev, nextPage: next });
		});
		const domain = document.location.hostname.indexOf('localhost') >= 0 ? 'local' : 'remote';
		if (domain !== 'local') {
			const parms = {};
			parms['json'] = JSON.stringify(pageflow);
			parms['subProductCode'] = this.selectedSubProduct;
			parms['pageName'] = 'pageflow';
			this.service.callExternalMethod('saveFormFields', parms).subscribe((result) => {
				// alert('success');
			});
		}
		console.log(JSON.stringify(pageflow));
	}

	add(input) {
		if (input.value.length > 0) {
			this.pageList.push({ name: input.value });
		}
	}

	delete(index) {
		const r = confirm('Are you sure to delete?!');
		if (r) {
			const domain = document.location.hostname.indexOf('localhost') >= 0 ? 'local' : 'remote';
			if (domain !== 'local') {
				const parms = {};
				parms['subProductCode'] = this.selectedSubProduct;
				parms['pageName'] = this.pageList[index]['name'];
				this.service.callExternalMethod('DeletePage', parms).subscribe((result) => {
					this.pageList = [];
					this.getPages(this.selectedSubProduct);
				});
			} else {
				this.pageList.splice(index, 1);
			}
		}
	}
}
