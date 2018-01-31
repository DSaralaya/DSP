import { Component, ViewContainerRef } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { AppConfig } from './config';

@Component({
	selector: 'app-progress',
	templateUrl: 'progress.component.html'
})
export class ProgressComponent implements OnInit {
	public pageName: any;
	component: any;
	model: any;
	constructor(private vcRef: ViewContainerRef) {}
	ngOnInit() {
		this.component = this.vcRef['_view']['component'];
		this.model = this.component['model'];
	}

	getCurrent(page) {
		this.pageName = AppConfig.GetPageName(this.model);
		return page === this.pageName ? 'current' : '';
	}
}
