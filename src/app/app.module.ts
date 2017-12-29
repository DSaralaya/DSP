import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,Validators, FormControl } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import {ReactiveFormsModule} from '@angular/forms';
import {FormlyModule} from '@ngx-formly/core';
import {FormlyBootstrapModule} from '@ngx-formly/bootstrap';
import { AppComponent } from './app.component';
import { GetStartedComponent } from './get-started/get-started.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { TextMaskModule } from 'angular2-text-mask';
import { Configmod } from 'app/services/configmod';
//------custom fields----//
import { currencyService } from 'app/services/currency';
import { maskService } from 'app/services/masking';
import { FormlyFieldInput } from 'app/services/input';
import { FormlyPanelWrapper } from 'app/services/wrapper';



const appRoutes: Routes = [
  { path: 'get-started', component: GetStartedComponent },
  { path: 'personal-info', component: PersonalInfoComponent },
];


@NgModule({
  declarations: [
    AppComponent,
    GetStartedComponent,
    PersonalInfoComponent,currencyService,maskService,FormlyFieldInput,FormlyPanelWrapper
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule, CurrencyMaskModule,TextMaskModule,Configmod,
    FormlyBootstrapModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
