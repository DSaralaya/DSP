import { Component } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { NgProgress } from '@ngx-progressbar/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { LocalService } from './shared/services/localJson.service';
import { DynamicComponent } from './dynamic/dynamic.component';
import { UiStartComponent } from './ui-form/ui-start.component';
@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {
	constructor(private router: Router, progress: NgProgress, public service: LocalService) {
		router.events.subscribe((event) => {
			if (event instanceof NavigationStart) {
				progress.start();
			}
			if (event instanceof NavigationEnd) {
			}
		});
	}
	ngOnInit() {}
}
