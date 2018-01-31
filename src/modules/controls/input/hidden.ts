import { Component, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
	selector: 'app-hidden',
	template: `
  <input type="{{to.type || 'text'}}"
        style="display:none;"
        id="{{id}}"
         [formlyAttributes]="field" [formControl]="formControl">

    `
})
export class HiddenInputComponent extends FieldType {
	get type(): string {
		return this.to.type || 'text';
	}
}
