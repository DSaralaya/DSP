
import { Component, OnDestroy, OnInit } from "@angular/core";
import { FieldType } from "@ngx-formly/core";
import { error } from "selenium-webdriver";

@Component({
  selector: "formly-field-jointApplicant",
  template: `
  <div class="input-wrapper">
  <div class="form-group material">
              <button type="button" class="btn-add-panel smooth-hover"  ngClass="{'disabled': to.disabled}"
              (click)="JointApplicant($event)">
          <input type="checkbox"
                id="{{id}}"
                [formControl]="formControl"  [formlyAttributes]="field" class="d-none">
          <span *ngIf="!model[to.objectName][to.fieldName]">
            <span class="fa fa-stack"><i class="fa fa-circle-thin fa-stack-2x"></i><i class="fa fa-plus fa-stack-1x"></i></span>
            <span> {{to.label || 'Checkbox'}}</span>
          </span>
          <span *ngIf="model[to.objectName][to.fieldName]" ngClass="{'disabled': to.disabled}">
            <span class="fa fa-stack"><i class="fa fa-circle-thin fa-stack-2x"></i><i class="fa fa-times fa-stack-1x"></i></span>
            <span> {{to.altLabel || 'Remove Applicant'}}</span>
          </span>
    </button>
  </div>
  </div>


    `
})
export class JointApplicant extends FieldType implements OnInit  {
    JointApplicant($event)
    {
        this.model[this.to.objectName][this.to.fieldName] = !this.model[this.to.objectName][this.to.fieldName];
    }
}

