import { Component, OnDestroy, OnInit, ElementRef } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
	selector: 'app-image-radio',
  template: `
  <div class="product-select">
  <div class="form-check form-check-inline" *ngFor="let item of items;let i=index;">
  <label class="form-check-label" >
  <input class="form-check-input" (change)="selectItem(i)"  type="radio" [value]="item.value" [formControl]="formControl"  [formlyAttributes]="field">
  <img  alt="productIcon" ng-class="{'error-validation' : showError}" src="{{item.img}}">
      {{ item.value}}
  </label>
  </div>
  <div *ngIf="!to.key && showError"> 
    <formly-validation-message class="validation" [field]="field"></formly-validation-message>
  </div>
  </div>

    `
})
export class ImageRadioComponent extends FieldType implements OnInit {
	public items: any;
	ngOnInit() {
      if(this.field['data'] && this.field['data']['options']){
        this.items =JSON.parse(JSON.stringify(this.field['data']['options']));
      }
		
	}
  public selectItem(index){
    debugger;
    if(this.field['data'] && this.field['data']['options']){
    this.items =JSON.parse(JSON.stringify(this.field['data']['options']));
    this.items.forEach(element => {
        element['img']=element['img'].replace('selected','');
    });
    this.items[index]['img']=this.items[index]['img'].replace(index,'selected'+index);
  }
  }
}
