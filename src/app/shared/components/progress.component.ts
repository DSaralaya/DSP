import { Component, ViewContainerRef } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { AppConfig } from '../common/config';

@Component({
	selector: 'app-progress',
	templateUrl: 'progress.component.html'
})
export class ProgressComponent implements OnInit {
	public pageName: any;
	component: any;
	pageFlow: any;
	constructor(private vcRef: ViewContainerRef) {}

	ngOnInit() {
		this.component = this.vcRef['_view']['component'];
		this.pageFlow = this.component['pageFlow'];
		this.pageName = this.component['pageName'];
	}

	getCurrent(page) {
		return page === this.pageName ? 'current' : '';
	}
}
