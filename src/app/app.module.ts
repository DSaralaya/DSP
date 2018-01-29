
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { GetStartedComponent } from './get-started/get-started.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { IdentityComponent } from './identity/identity.component';
import { FormlyControls } from '../modules/formlyControls';
import { LocalService } from 'app/services/localJson.service';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgProgressModule } from '@ngx-progressbar/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CrossSellComponent } from './cross-sell/cross-sell.component';
import { EmploymentComponent } from './employment/employment.component';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { ReviewSubmitComponent } from './review-submit/review-submit.component';
import { APP_BASE_HREF, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { ProgressComponent } from './shared/progress.component';



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
];

@NgModule({
  declarations: [
    AppComponent, GetStartedComponent, PersonalInfoComponent, IdentityComponent, CrossSellComponent,
     EmploymentComponent, AccountDetailsComponent, ReviewSubmitComponent, ConfirmationComponent, ProgressComponent
  ],
  imports: [
    BrowserModule, RouterModule.forRoot(appRoutes), FormlyControls, HttpModule, BrowserAnimationsModule,
    NgProgressModule.forRoot()
  ],
  providers: [LocalService,
    {provide: LocationStrategy, useClass: HashLocationStrategy}
    , {provide: APP_BASE_HREF, useValue : '/' }
],
  bootstrap: [AppComponent]


})
export class AppModule { }
