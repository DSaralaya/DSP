import { Component, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
	selector: 'app-input',
	template: `
  <mat-form-field>
    <input matInput [id]="id"  placeholder="{{to.label}}  {{to.required? '*':''}}"  [type]="type" [maxlength]="maxlength" [formControl]="formControl"
      [formlyAttributes]="field" >
      </mat-form-field>
    `
})
export class InputComponent extends FieldType {
	get type(): string {
		return this.to.type || 'text';
	}

	get maxlength(): number {
		return this.to['maxlength'];
	}
}
