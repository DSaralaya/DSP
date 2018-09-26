import { Component, OnDestroy, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'app-select',
	template: `
   <mat-select placeholder="{{to.label}} {{to.required? '*':''}}" [formControl]="formControl" [formlyAttributes]="field">
            <mat-option *ngFor="let item of items" [value]="item.value">
              {{ item.name }}
            </mat-option>
          </mat-select>
    `
})


export class SelectComponent extends FieldType implements OnInit {
	public items: any;

	ngOnInit() {
		this.items = this.to.options;
	}
}
