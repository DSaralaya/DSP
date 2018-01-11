import { Component, OnInit } from "@angular/core";
import { FormsModule, FormGroup } from "@angular/forms";
import { FieldType } from "@ngx-formly/core";

@Component({
  selector: "Currency",
  template: `
  <mat-form-field>
    <input  matInput placeholder="{{to.label}} {{to.required? '*':''}}"  currencyMask [formControl]="formControl" [formlyAttributes]="field" type="tel" class="form-control" [options]="{ allowNegative:false, allowZero:false, align:'left', prefix: '$', thousands: ',', decimal: '.',precision: 2}"  />
    </mat-form-field>
    `
})
export class FormlyCurrency extends FieldType implements OnInit {
  ngOnInit() {}
}
// <input  matInput placeholder="{{to.label}} {{to.required? '*':''}}" currencyMask  [formControl]="formControl" [formlyAttributes]="field" type="tel" class="form-control" [options]="{ align:'left', prefix: '$', thousands: ',', decimal: '.',precision: 2}" />
// </mat-form-field>