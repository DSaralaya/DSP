import { Component, OnDestroy, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
	selector: 'app-toggle',
	template: `
 <span class="toggle-label">{{ to.label }}</span>
<mat-slide-toggle [id]="id" [formControl]="formControl"  [formlyAttributes]="field" (change)="onChange($event)">{{items}} </mat-slide-toggle>
    `
})
export class ToggleComponent extends FieldType {
	public items ='No';
	onChange(value) {
    if (value.checked === true) {
      this.items = 'Yes';
    } else {
      this.items ='No';
    }
  }
}
