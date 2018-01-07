import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LocalService } from 'app/services/localJson.service';

@Component({
  selector: 'app-identity',
  templateUrl: './identity.component.html',
  styleUrls: ['./identity.component.css']
})
export class IdentityComponent implements OnInit {

  public model: any;
  public fields: any;
  form = new FormGroup({});

  constructor(private service: LocalService) { }

  ngOnInit() {
    this.getAppFields();
  }

  getAppFields() {
    this.service.get('identity').subscribe(result => {
      this.fields = result.fields;
      this.model = result;
      delete this.model['fields'];
    }
    );
  }


  submit() {
    if (this.form.valid) {
    }
  }
}
