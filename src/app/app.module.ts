import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { GetStartedComponent } from './get-started/get-started.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { IdentityComponent } from './identity/identity/identity.component';
import { FormlyControls } from '../modules/formlyControls';
import { LocalService } from 'app/services/localJson.service';
import { NgProgressModule } from '@ngx-progressbar/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


const appRoutes: Routes = [
  { path: '', redirectTo: "/get-started", pathMatch: 'full' },
  { path: 'get-started', component: GetStartedComponent },
  { path: 'personal-info', component: PersonalInfoComponent },
  { path: 'identity', component: IdentityComponent },
];

@NgModule({
  declarations: [
    AppComponent, GetStartedComponent, PersonalInfoComponent, IdentityComponent
  ],
  imports: [
    BrowserModule, RouterModule.forRoot(appRoutes), FormlyControls, HttpModule, BrowserAnimationsModule,
    NgProgressModule.forRoot()
  ],
  providers: [LocalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
