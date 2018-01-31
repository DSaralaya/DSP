import { Component, OnInit } from '@angular/core';
import { FormsModule, FormGroup } from '@angular/forms';
import { FieldType } from '@ngx-formly/core';

@Component({
	selector: 'app-currency',
	template: `
  <mat-form-field>
    <input  matInput placeholder="{{to.label}} {{to.required? '*':''}}"  appCurrencyMask [formControl]="formControl" [formlyAttributes]="field" type="tel" class="form-control"   />
    </mat-form-field>
    `
})
export class CurrencyComponent extends FieldType implements OnInit {
	ngOnInit() {}
}
