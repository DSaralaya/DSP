import { Component, OnInit } from '@angular/core';
import { FieldArrayType, FormlyFormBuilder } from '@ngx-formly/core';

@Component({
  selector: 'repeat-section',
  template: `

  <div *ngFor="let field of field.fieldGroup; let i = index;">
  <div class="deletebtn">
        <button class="btn" type="button" (click)="remove(i)">Remove</button>
   </div>
  <formly-group
    [field]="field"
    [options]="options"
    [form]="formControl">
  </formly-group>
</div>

<div >

  <button class="add-panel-btn" *ngIf="isEdit()" type="button" (click)="(!this.model['form']?this.formState.submitted=false:'');add();"><i class="fa fa-plus-circle"></i> {{ this.field.parent.fieldGroup && this.field.parent.fieldGroup.length>1 ? ('Add Another ' + this.formState.model[this.field.parent.fieldGroup[0].key]):field.fieldArray.templateOptions.btnText }}</button>
</div>
  `,
})
export class RepeatTypeComponent extends FieldArrayType implements OnInit  {
  constructor(builder: FormlyFormBuilder) {
    super(builder);
  }
  ngOnInit(){
    debugger;
  }
 
  isEdit(){
    if(this.formState && this.formState['curIndex']!=-1 && !this.field['data']){
      return false;
    }
     return true;
  }
  



}