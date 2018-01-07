import { Component, OnInit } from '@angular/core';
import { LocalService } from 'app/services/localJson.service';
import { FormGroup } from '@angular/forms';
import { ValidationService } from 'app/services/validation.service';
import { Router } from "@angular/router";
import { config } from 'ngx-mask/build/config';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css']
})
export class PersonalInfoComponent implements OnInit {

  public model: any;
  public fields: any;
  public form = new FormGroup({});
  constructor(private service: LocalService, private router: Router) { }

  ngOnInit() {
    setTimeout(() => {
      this.getAppFields();
    }, 1200);
  }

  getAppFields() {
    this.service.get('personal-info').subscribe(result => {
      this.fields = result.fields;
      this.model = result;
      delete this.model['fields'];
      this.form.valueChanges.subscribe(() => {
        ValidationService.orgModel = this.model;
      });
      
    }
    );

  }

  submit() {
    if (this.form.valid) {
      console.log(this.model);
      this.router.navigateByUrl('/identity');
    }
  }

}
