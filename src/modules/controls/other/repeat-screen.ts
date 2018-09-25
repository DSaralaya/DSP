import { Component, OnInit } from '@angular/core';
import { FieldArrayType, FormlyFormBuilder, FormlyFormOptions, FormlyFieldConfig, FormlyTemplateOptions } from '@ngx-formly/core';
import { FormGroup } from '@angular/forms';
import clone from 'lodash.clonedeep';

@Component({
  selector: 'repeat-screen',
  templateUrl: 'repeat-screen.html'
})
export class RepeatScreenComponent extends FieldArrayType implements OnInit {
  showForm = false;
  showList=true;
  singleForm = new FormGroup({});
  singleField = [];
  ops: any = {};
  index=-1;
  mdl = {};

  constructor(builder: FormlyFormBuilder) {
    super(builder);
  }
  
  ngOnInit() {
    this.singleField = clone(this.field.fieldArray.fieldGroup);
  }

  addItem(value) {
    this.showForm = true;
    this.showList=false;
  }

  hideForm() {
    this.showForm = false;
    this.showList=true;
    this.index=-1;
    this.ops.resetModel();
    this.ops={};
    
  }

  editForm(index) {
      this.index= index;
      this.mdl = clone(this.model[index]);
      this.showForm = true;
      this.showList=false;
  }

  save(model) {
    this.ops.formState.submitted = true;
		if (this.singleForm.valid){
      if(this.index==-1){
        this.add(null, model);
      } else {
        this.formControl.at(this.index).patchValue(model);
      }
      this.hideForm();
    }
  }
}

