import { Component, OnDestroy, OnInit } from "@angular/core";
import { FieldType } from "@ngx-formly/core";
import { error } from "selenium-webdriver";

@Component({
  selector: "formly-field-checkbox",
  template: `

  <mat-checkbox [formControl]="formControl" [id]="id" [formlyAttributes]="field">
  {{ to.label }}
  {{ to.required ? '*' : '' }}
</mat-checkbox>

    `
})
export class FormlyCheckBox extends FieldType implements OnInit  {
    // <label class="form-check-label "  >
    // <input  class="form-check-input" type="checkbox" [formControl]="formControl"  [formlyAttributes]="field">
    // {{ to.label}} {{ to.required ? '*' : '' }}  
    // </label>
    ngAfterContentChecked() {
        if (this.to.hidden) {
            this.model[this.field.key] = '';
        }   
    }
}
