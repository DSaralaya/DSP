import { Component, OnDestroy, OnInit, ElementRef } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
	selector: 'app-product-select',
  template: `
  <div class="product-select row">
  <div *ngFor="let items of products;let k=index" class="col-sm-12" >
  <div class="labelheader">{{items.label}}</div>
  <div class="form-check form-check-inline" *ngFor="let item of items.list; let i=index;">
  <label>
      <input (change)="selectProduct(k,i)"   type="radio" [value]="item.value" [formControl]="formControl"  [formlyAttributes]="field">
      <img  alt="productIcon"  src="{{item.img}}">
      {{item.value}}
  </label>
</div>
</div>
<div *ngIf="showError"> 
      <formly-validation-message class="validation" [field]="field"></formly-validation-message>
</div>
</div>

    `
})
export class ProductSelectComponent extends FieldType implements OnInit {
  public products: any;
  imagurl=[];
  constructor(private elRef:ElementRef){
    super();

  }
	ngOnInit() {
    this.products = this.field['data']['list'];
  }
  public selectProduct(pindex,index){
    if(this.field['data'] && this.field['data']['list']){
      this.products.forEach(element => {
        element.list.forEach(item => {
          item['img']=item['img'].replace('selected','');
        });
      });
     
      this.products[pindex]['list'][index]['img']=this.products[pindex]['list'][index]['img'].replace(index,'selected'+index);
    }
  }
}
