import { Component, OnInit, ViewChild, ViewContainerRef, ChangeDetectorRef } from '@angular/core';
import { FormsModule, FormGroup } from '@angular/forms';
import { FieldType } from '@ngx-formly/core';
import { NgxMaskModule } from 'ngx-mask';


@Component({
	selector: 'app-zipcode',
	template: `
    <input type="text" [mask]='mask' matInput placeholder="{{to.label}} {{to.required? '*':''}}"
      [formControl]="formControl" [formlyAttributes]="field"  />
    `
})
export class ZipcodeComponent extends FieldType {
	constructor(private cd: ChangeDetectorRef) {
		super();
	}

	get mask(): string {
		return '99999-9999';
	}

	get dropSpecialCharacters(): boolean {
		return false;
	}

	get clearIfNotMatch(): boolean {
		return true;
	}
}
