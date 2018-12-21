import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormsModule, FormGroup } from '@angular/forms';
import { FieldType } from '@ngx-formly/core';
import { NgxMaskModule } from 'ngx-mask';


@Component({
	selector: 'app-masking',
	template: `
	<mat-icon *ngIf="field.data && field.data.addon" class="fa {{field.data.addon}}"></mat-icon>
    <input matInput placeholder="{{to.label}} {{to.required? '*':''}}" [dropSpecialCharacters]="false" autocomplete="nope"   type="text" mask='{{mask}}'    [formControl]="formControl" [formlyAttributes]="field"  class="form-control"  />
   
    `
})
export class InputMaskComponent extends FieldType  {
	get mask(): string {
		return this.field.templateOptions.mask || '';
	}

	get dropSpecialCharacters(): boolean {
		return false;
	}
}
