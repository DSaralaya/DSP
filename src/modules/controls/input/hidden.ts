
import { Component, OnDestroy, ChangeDetectorRef } from "@angular/core";
import { FieldType } from "@ngx-formly/core";

@Component({
  selector: "formly-field-hidden",
  template: `
  <input type="{{to.type || 'text'}}"
        style="display:none;"
        id="{{id}}"
         [formlyAttributes]="field" [formControl]="formControl">

    `
})
export class FormlyHiddenInput extends FieldType  {
  get type(): string {
    return this.to.type || "text";
  }
}
