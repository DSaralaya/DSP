import { Component, OnDestroy, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
	selector: 'app-radio',
  template: `
  <mat-radio-group
  [formControl]="formControl"
  [formlyAttributes]="field">
  <div class="form-check form-check-inline" *ngFor="let item of items;let i=index;">
  <label class="form-check-label">
      <mat-radio-button [value]="item.value" ></mat-radio-button>
  {{ item.value}}
  </label>
</div>
</mat-radio-group>
    `
})
export class RadioComponent extends FieldType implements OnInit {
	public items: any;
	ngOnInit() {
		this.items = this.to.options;
  }
 
}
