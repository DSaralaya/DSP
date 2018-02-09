import { APP_BASE_HREF, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { NgProgressModule } from '@ngx-progressbar/core';

import { FormlyControls } from '../modules/formlyControls';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { AppComponent } from './app.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { CrossSellComponent } from './cross-sell/cross-sell.component';
import { EmploymentComponent } from './employment/employment.component';
import { GetStartedComponent } from './get-started/get-started.component';
import { IdentityComponent } from './identity/identity.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { ReviewSubmitComponent } from './review-submit/review-submit.component';
import { ProgressComponent } from './shared/components/progress.component';
import { LocalService } from './shared/services/localJson.service';
import { UiFormComponent } from './ui-form/ui-form.component';
import { SortablejsModule } from 'angular-sortablejs';
import { NgDragDropModule } from 'ng-drag-drop';
import { VfRemoteService } from '../modules/vfremote/vf-remote.service';
import { UiStartComponent } from './ui-form/ui-start.component';

const appRoutes: Routes = [
	{ path: '', redirectTo: 'get-started', pathMatch: 'full' },
	{ path: 'get-started', component: GetStartedComponent },
	{ path: 'cross-sell', component: CrossSellComponent },
	{ path: 'personal-info', component: PersonalInfoComponent },
	{ path: 'identity', component: IdentityComponent },
	{ path: 'employment', component: EmploymentComponent },
	{ path: 'account-details', component: AccountDetailsComponent },
	{ path: 'review-submit', component: ReviewSubmitComponent },
	{ path: 'confirmation', component: ConfirmationComponent },
	{ path: 'ui-form', component: UiFormComponent },
	{ path: 'ui-start', component: UiStartComponent }
];

@NgModule({
	declarations: [ AppComponent, GetStartedComponent, PersonalInfoComponent, IdentityComponent, CrossSellComponent, EmploymentComponent, AccountDetailsComponent, ReviewSubmitComponent, ConfirmationComponent, ProgressComponent, UiFormComponent, UiStartComponent ],
	imports: [ BrowserModule, RouterModule.forRoot(appRoutes), FormlyControls, HttpModule, BrowserAnimationsModule, NgProgressModule.forRoot(), SortablejsModule, NgDragDropModule.forRoot() ],
	providers: [ VfRemoteService, LocalService, { provide: LocationStrategy, useClass: HashLocationStrategy }, { provide: APP_BASE_HREF, useValue: '/' } ],
	bootstrap: [ AppComponent ]
})
export class AppModule {}
