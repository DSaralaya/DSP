import { Component } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { NgProgress } from '@ngx-progressbar/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(router: Router, progress: NgProgress) {
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        progress.start();
      }
      if (event instanceof NavigationEnd) {

      }
    });
  }
}
