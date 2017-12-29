import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators } from "@angular/forms";
import { FormlyFormOptions, FormlyFieldConfig } from "@ngx-formly/core";
import { ValidationService } from "../services/validation.service";

@Component({
  selector: "app-get-started",
  templateUrl: "./get-started.component.html",
  styleUrls: ["./get-started.component.css"]
})
export class GetStartedComponent {
  form = new FormGroup({});

  fields = [
    {
      templateOptions: {
        template: '<h4 class="form-title">LET\'S GET STARTED</h4>'
      },
      wrappers: "section",
      fieldGroupClassName: "row",
      fieldGroup: [
        {
          key: "FirstName__c",
          type: "alphabet",
          className: "col-md-3",
          templateOptions: {
            required: true,
            label: "First Name"
          }
        },
        {
          key: "LastName__c",
          type: "alphabet",
          className: "col-md-3",
          hideExpression: "!model.FirstName__c",
          templateOptions: {
            required: true,
            label: "Last Name"
          }
        },
        {
          key: "DateOfBirth__c",
          type: "dob",
          className: "col-md-3",
          templateOptions: {
            required: true,
            label: "Date of Birth",
            Mask: "date"
          }
        }
      ]
    }
  ];

  submit() {
    alert("submitted");
  }
}
