import { FieldType } from "@ngx-formly/core";
import { OnInit, Component } from "@angular/core";

@Component({
    selector: "formly-field-readony;",
    template: `
    <mat-form-field>
      <input matInput [id]="id"  placeholder="{{to.label}}  {{to.required? '*':''}}"  [type]="type" [maxlength]="maxlength" [formControl]="formControl" 
        [formlyAttributes]="field" readonly="true" >
        </mat-form-field>
      `
  })
  
export class FormlyReadOnly extends FieldType implements OnInit {
    ngOnInit() {}
  }