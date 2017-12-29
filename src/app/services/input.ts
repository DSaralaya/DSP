import { Component, OnDestroy } from "@angular/core";
import { FieldType } from "@ngx-formly/core";

@Component({
  selector: "formly-field-input",
  template: `
    <input   [type]="type" [maxlength]="maxlength" [formControl]="formControl" class="form-control"
      [formlyAttributes]="field" >
    `
})
export class FormlyFieldInput extends FieldType implements OnDestroy {
  get type(): string {
    return this.to.type || "text";
  }

  get maxlength(): number {
    return this.to["maxlength"];
  }
  ngOnDestroy() {
    alert("d");
  }
}
