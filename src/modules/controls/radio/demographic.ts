import { Component, OnDestroy, OnInit, ElementRef } from '@angular/core';
import { FieldType } from '@ngx-formly/core';


@Component({
	selector: 'app-demographic',
  template: `
 
  <mat-radio-group
      [formControl]="formControl"
      [formlyAttributes]="field">
  <div class="form-check" *ngFor="let item of items;let i=index;">
    <label class="form-inline-label" >
    <mat-radio-button   [value]="item.value" ></mat-radio-button>
        {{ item.value}}
    </label>
    <ng-container *ngIf="item.fieldGroup">
    <div class="row inradio">
    <formly-form 
                [model]="model"
                [form]="form"
                [fields]="item.fieldGroup"
                [options]="options">
            </formly-form>
            </div>
    </ng-container>
  </div>
  </mat-radio-group>
  
    `
})
export class DemographicComponent extends FieldType implements OnInit {
    public items: any;

	ngOnInit() {
      if(this.field['data'] && this.field['data']['options']){
        this.items =JSON.parse(JSON.stringify(this.field['data']['options']));
      }
	}
 
}
