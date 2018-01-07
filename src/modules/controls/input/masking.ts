import {  Component, OnInit, ViewChild, ViewContainerRef } from "@angular/core";
import { FormsModule, FormGroup } from "@angular/forms";
import { FieldType } from "@ngx-formly/core";
import {NgxMaskModule} from 'ngx-mask'
import { FormlyFieldInput } from "@ngx-formly/bootstrap/src/types/input";

@Component({
  selector: "masking",
  template: `
  <mat-form-field>
    <input matInput placeholder="{{to.label}} {{to.required? '*':''}}" type="text" [mask]='mask' [dropSpecialCharacters]="dropSpecialCharacters"   [formControl]="formControl" [formlyAttributes]="field"  class="form-control"  />
    </mat-form-field>
    `
})
export class FormlyInputMask extends FieldType implements OnInit {

  get mask(): string {
    return this.field.templateOptions.mask || '';
  }
 
  get dropSpecialCharacters(): boolean {
    return false;
  }

}
