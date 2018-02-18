import { APP_BASE_HREF, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { NgProgressModule } from '@ngx-progressbar/core';

import { FormlyControls } from '../modules/formlyControls';

import { AppComponent } from './app.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { GetStartedComponent } from './get-started/get-started.component';

import { ProgressComponent } from './shared/components/progress.component';
import { LocalService } from './shared/services/localJson.service';
import { UiFormComponent } from './ui-form/ui-form.component';
import { SortablejsModule } from 'angular-sortablejs';
import { NgDragDropModule } from 'ng-drag-drop';
import { VfRemoteService } from '../modules/vfremote/vf-remote.service';
import { UiStartComponent } from './ui-form/ui-start.component';
import { DynamicComponent } from './dynamic/dynamic.component';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { SessionExpireComponent } from './session-expire/session-expire.component';
import { HttpClientModule } from '@angular/common/http';

const appRoutes: Routes = [
	{ path: '', redirectTo: 'form/:id', pathMatch: 'full' },
	{ path: 'get-started', component: GetStartedComponent },
	{ path: 'form/:id', component: DynamicComponent },
	{ path: 'ui-start/:id', component: UiStartComponent },
	{ path: 'ui-form', component: UiFormComponent },
	{ path: 'ui-start', component: UiStartComponent },
	{ path: 'session-expire', component: SessionExpireComponent }
];

@NgModule({
	declarations: [ AppComponent, GetStartedComponent, ConfirmationComponent, ProgressComponent, UiFormComponent, UiStartComponent, DynamicComponent, SessionExpireComponent ],
	imports: [ BrowserModule, RouterModule.forRoot(appRoutes), FormlyControls, HttpModule, BrowserAnimationsModule, NgProgressModule.forRoot(), SortablejsModule, NgDragDropModule.forRoot(), HttpClientModule, NgIdleKeepaliveModule.forRoot() ],
	providers: [ VfRemoteService, LocalService, { provide: LocationStrategy, useClass: HashLocationStrategy }, { provide: APP_BASE_HREF, useValue: '/' } ],
	bootstrap: [ AppComponent ]
})
export class AppModule {}
