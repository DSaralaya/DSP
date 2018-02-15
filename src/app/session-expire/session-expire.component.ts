import { Component, OnInit } from '@angular/core';
import { NgProgress } from '@ngx-progressbar/core';

@Component({
	selector: 'app-session-expire',
	templateUrl: './session-expire.component.html',
	styleUrls: [ './session-expire.component.less' ]
})
export class SessionExpireComponent implements OnInit {
	constructor(progress: NgProgress) {
		progress.done();
	}

	ngOnInit() {}
}
