import { Component, OnDestroy, OnInit } from "@angular/core";
import { FieldType } from "@ngx-formly/core";

@Component({
  selector: "formly-field-select",
  template: `
        <mat-form-field>
        <mat-select placeholder="{{to.label}} {{to.required? '*':''}}" [formControl]="formControl" [formlyAttributes]="field">
          <mat-option *ngFor="let item of items" [value]="item.value">
            {{ item.name }}
          </mat-option>
        </mat-select>
      </mat-form-field>
    `
})
export class FormlySelect extends FieldType implements OnInit {
  
  public items: any;

  ngOnInit() {
    this.items = this.to.options;
  }




}
