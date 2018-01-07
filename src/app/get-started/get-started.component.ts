import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators } from "@angular/forms";
import { FormlyFormOptions, FormlyFieldConfig } from "@ngx-formly/core";
import { ValidationService } from "../services/validation.service";
import { LocalService } from "app/services/localJson.service";
import { Router } from "@angular/router";


@Component({
  selector: "app-get-started",
  templateUrl: "./get-started.component.html",
  styleUrls: ["./get-started.component.css"]
})
export class GetStartedComponent implements OnInit {
  public model: any;
  public fields: any;
  form = new FormGroup({});
  options:FormlyFormOptions= { formState: { submitted: false } };
  

  constructor(private service: LocalService, private router: Router) { }

  ngOnInit() {
    this.getAppFields();
  }

  getAppFields() {
    this.service.get('get-started').subscribe(result => {
      this.fields = result.fields,
      this.model = result;
      delete this.model.fields;
    }
    );
  }

  submit() {
    this.options.formState.submitted= true;
    if (this.form.valid) {
      console.log(this.model);
      this.router.navigateByUrl('/personal-info');
    }
  }
}
