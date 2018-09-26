import { Component, OnDestroy, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'ngx-select',
  styleUrls: ['ng-select.less'],
	template: `
    <ng-select placeholder="{{to.label}} {{to.required? '*':''}}" [formControl]="formControl" [formlyAttributes]="field"
     [items]="items"
            bindLabel="name"
            bindValue="value" >
    </ng-select>
    `
})


export class NGXSelectComponent extends FieldType implements OnInit {
	public items: any;

	ngOnInit() {
		this.items = this.to.options;
	}
}
