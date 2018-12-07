import { Component, OnDestroy, OnInit, ElementRef } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
	selector: 'app-product-select',
  template: `
  <div class="product-select">
  <div *ngFor="let items of products;let k=index" class="col-sm-12" >
  <label class="labelheader">{{items.label}}</label><br/>
  <div class="form-check form-check-inline" *ngFor="let item of items.list; let i=index;">
  <label class="form-check-label"  >
      <input (click)="selectProduct(k,i)" class="form-check-input" type="radio" [value]="item" [formControl]="formControl"  [formlyAttributes]="field">
      <img class="SVG_{{i}}" alt="productIcon" ng-class="{'error-validation' : showError}" src="{{imagurl[(((k+1) * items.list.length) + i)]}}">
 
  </label>
</div>
</div>
<div *ngIf="showError"> <formly-validation-message class="validation" [field]="field"></formly-validation-message></div>

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
    var count=0;
    this.products.forEach(items => {
      var i=0;
      items.list.forEach(element => {
        this.imagurl.push('https://dodev-eastwestbank.cs14.force.com/resource/1543971654000/eastwest/dist/assets/images/armWhite'+(count==0?'':'Other')+i+'.svg');
        i++;
      });
      count++;
    });
    console.log(this.imagurl);
  }
  public selectProduct(parent,index){
    var count=0;
    this.imagurl.forEach(element => {
       if(count==index){
        this.imagurl[count]='https://dodev-eastwestbank.cs14.force.com/resource/1543971654000/eastwest/dist/assets/images/armRed'+(parent==0?'':'Other')+count+'.svg';
       } else {
        this.imagurl[count]='https://dodev-eastwestbank.cs14.force.com/resource/1543971654000/eastwest/dist/assets/images/armWhite'+(parent==0?'':'Other')+count+'.svg';
       }
       count++;
    });
    
  }
}
