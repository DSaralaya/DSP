import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LocalService } from 'app/services/localJson.service';
import { FormlyConfig } from '@ngx-formly/core/src/services/formly.config';
import { FormlyFormOptions } from '@ngx-formly/core';
import { SharedModel } from "app/shared/sharedmodel.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-identity',
  templateUrl: '../shared/sharedmodel.component.html'
 
})

export class IdentityComponent extends SharedModel implements OnInit {
  public pageTitle="Identity";
  private navigateUrl="employement";

  constructor(public service: LocalService, public router: Router){
    super(service,router);
  }

  ngOnInit() {
    this.getAppFields('identity');
  }

}
