import { Component, OnDestroy } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
	selector: 'app-ssn',
	template: `
 
    <input matInput placeholder="{{to.label}} {{to.required? '*':''}}"   [type]="type" appSsn  [mask]='mask' [clearIfNotMatch]="clearIfNotMatch"   [formControl]="formControl" class="form-control"
      [formlyAttributes]="field">
     
    `
})
export class SSNInputComponent extends FieldType {
	get mask(): string {
		return '999-99-9999';
	}
	get type(): string {
		return this.to.type || 'text';
	}
	get dropSpecialCharacters(): boolean {
		return false;
	}
	get clearIfNotMatch(): boolean {
		return true;
	}
}
