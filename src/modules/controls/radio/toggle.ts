import { Component, OnDestroy, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
	selector: 'app-toggle',
  template: `
  <div class="input-group-switcher">
  <label class="input-group-title" >
      {{to.label}}
  </label>
  <div *ngIf="!to.key"  class="custom-input-switcher {{ (model[to.objectName][to.fieldName]==='Yes' || model[to.objectName][to.fieldName]===true) ?'active':''}}"  (click)="toggleButton()">
    <div *ngFor="let item of items;let i=index;"> 
        <input class="hidden"  type="radio" [value]="item.value" [formControl]="formControl"  [formlyAttributes]="field">
    </div>
      <span class="yes">YES</span>
      <span class="no">NO</span>
      <div class="switcher"></div>
    </div> 
    <div *ngIf="to.key"  class="custom-input-switcher {{ (model[to.key]==='Yes' || model[to.key]===true) ?'active':''}}"  (click)="toggleButton()">
    <div *ngFor="let item of items;let i=index;"> 
        <input class="hidden"  type="radio" [value]="item.value" [formControl]="formControl"  [formlyAttributes]="field">
    </div>
      <span class="yes">YES</span>
      <span class="no">NO</span>
      <div class="switcher"></div>
    </div> 
</div>
    `
})
export class ToggleComponent extends FieldType implements OnInit {
	public items: any;
	ngOnInit() {
    this.items=[{ value:"Yes",name:"Yes"},{ value:"No",name:"No"}];
    if(!this.to['key'] && !this.model[this.to['objectName']][this.to['fieldName']]){
      this.model[this.to['objectName']][this.to['fieldName']]='No';
    } 
    
  }
	toggleButton(value) {
    if(!this.to['key'] && (this.model[this.to['objectName']][this.to['fieldName']]==='Yes' || this.model[this.to['objectName']][this.to['fieldName']]===true)) {
      if(this.model[this.to['objectName']][this.to['fieldName']]==='Yes'){
        this.model[this.to['objectName']][this.to['fieldName']]='No'
      } else if(this.model[this.to['objectName']][this.to['fieldName']]===true) {
        this.model[this.to['objectName']][this.to['fieldName']]=false;
      }
    } else if(!this.to['key'] ){
      if(this.model[this.to['objectName']][this.to['fieldName']]==='No'){
        this.model[this.to['objectName']][this.to['fieldName']]='Yes';
      } else if(this.model[this.to['objectName']][this.to['fieldName']]===false) {
        this.model[this.to['objectName']][this.to['fieldName']]=true;
      }
    } else if(this.to['key'] && this.model[this.to['key']]==true) {
        this.model[this.to['key']]=false;
    } else {
      this.model[this.to['key']]=true;
    }
  }
}
