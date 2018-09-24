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
  }

  hideForm() {
    this.showForm = false;
    this.index=-1;
    this.ops.resetModel();
  }

  editForm(index) {
      debugger;
      this.index= index;
      this.mdl = clone(this.model[index]);
      this.showForm = true;
  }

  save(model) {
      if(this.index==-1){
        this.add(null, model);
      } else {
        this.formControl.at(this.index).patchValue(model);
      }
      this.hideForm();
  }
}

