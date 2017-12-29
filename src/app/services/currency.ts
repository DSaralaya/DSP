import { Injectable, Component, OnInit } from "@angular/core";
import { FormsModule, FormGroup } from "@angular/forms";
import { FieldType } from "@ngx-formly/core";

@Component({
  selector: "Currency",
  template: `
    <input currencyMask  [formControl]="formControl" [formlyAttributes]="field" type="tel" class="form-control" [options]="{ align:'left', prefix: '$', thousands: ',', decimal: '.',precision: 2}" />
    `
})
export class currencyService extends FieldType implements OnInit {
  ngOnInit() {}
}
