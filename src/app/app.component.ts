import { Component } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { NgProgress } from '@ngx-progressbar/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { LocalService } from './shared/services/localJson.service';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {
	constructor(private router: Router, progress: NgProgress, public service: LocalService, private idle: Idle, private keepalive: Keepalive) {
		idle.setIdle(900);
		idle.setTimeout(900);
		idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
		idle.onTimeout.subscribe(() => {
			this.router.navigateByUrl('/session-expire');
		});
		//keepalive.interval(15);
		this.idle.watch();
		router.events.subscribe((event) => {
			if (event instanceof NavigationStart) {
				// progress.();
			}
			if (event instanceof NavigationEnd) {
			}
		});
	}
	ngOnInit() {}
}
