import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormsModule, FormGroup } from '@angular/forms';
import { FieldType } from '@ngx-formly/core';
import { NgxMaskModule } from 'ngx-mask';


@Component({
	selector: 'app-masking',
	template: `
  
    <input matInput placeholder="{{to.label}} {{to.required? '*':''}}" type="text" [mask]='mask'    [formControl]="formControl" [formlyAttributes]="field"  class="form-control"  />
   
    `
})
export class InputMaskComponent extends FieldType implements OnInit {
	get mask(): string {
		return this.field.templateOptions.mask || '';
	}

	get dropSpecialCharacters(): boolean {
		return false;
	}
}
