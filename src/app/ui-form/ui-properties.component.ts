import { Component } from '@angular/core';
import { SimpleModalComponent, SimpleModalOptions } from 'ngx-simple-modal';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions } from '@ngx-formly/core';
import { DomSanitizer } from '@angular/platform-browser';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

export interface Iuipropertiesmodel {
	properties: any;
}

@Component({
	selector: 'app-propertiesmodal',
	template: `
    <div class="modal-dialog propertiesmodal">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">{{ pageTitle}}</h5>
        <button type="button" (click)="close()" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <div class="row">
      <div class="form-group col-sm-12" *ngIf="properties.type=='section'">
          <label>Template</label>
          <textarea [(ngModel)]="properties.template" name="template{{properties.id}}" class="form-control" placeholder="Enter template"></textarea>
      </div>
      <div class="form-group col-sm-4">
          <label>DSP Label</label>
          <input type="text" [(ngModel)]="properties.dspname" name="dspname{{properties.id}}" class="form-control" placeholder="Enter DSP Name">
      </div>
      <div class="form-group col-sm-4">
          <label> Label</label>
          <input type="text" [(ngModel)]="properties.label" name="label{{properties.id}}" class="form-control" placeholder="Enter Label">
      </div>
      <div class="form-group col-sm-4">
          <label>Application Object</label>
          <input type="text" [(ngModel)]="properties.objectName" name="applicationObject{{properties.id}}" class="form-control"
              placeholder="Enter Application Object">
      </div>
      <div class="form-group col-sm-3">
          <label>DataType </label>
          <input type="text" [(ngModel)]="properties.dataType" name="properties.dataType" class="form-control" placeholder="Enter DataType">
      </div>
      <div class="form-group col-sm-5">
          <label>Class </label>
          <input type="text" [(ngModel)]="properties.className" name="properties.className" class="form-control" placeholder="Enter DataType">
      </div>
      <div class="form-group col-sm-3">
        <label>Option Types </label>
        <input type="text" [(ngModel)]="properties.optionType" name="properties.optionType" class="form-control" placeholder="Enter optionType">
      </div>
      <div class="form-group col-sm-1">
          <label>Required </label>
          <input type="checkbox" [(ngModel)]="properties.required" name="properties.required" class="form-control">
      </div>
      <div class="form-group col-sm-6">
          <label>hideExpression </label>
          <textarea [(ngModel)]="properties.hideExpression" name="properties.hideExpression" class="form-control" placeholder="Enter DataType"></textarea>
      </div>
      <div class="form-group col-sm-6">
          <label>expressionProperties </label>
          <textarea [(ngModel)]="properties.expressionProperties" name="properties.expressionProperties" class="form-control" placeholder="Enter DataType"></textarea>
      </div>
      <div class="form-group col-sm-6" *ngIf="properties.dataType=='select'">
          <label>Pick List </label>
          <textarea [(ngModel)]="properties.picklist" name="properties.picklist" class="form-control" placeholder="Enter picklist"></textarea>
      </div>
  </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary"  (click)="close()">Done</button>
      </div>
    </div>
  </div>
    `
})
export class UiPropertiesModalComponent extends SimpleModalComponent<Iuipropertiesmodel, boolean> {
	form = new FormGroup({});
	public pageTitle = 'Properties';
	constructor(private sanitizer: DomSanitizer) {
		super();
	}

	confirm() {
		this.result = true;
		this.close();
	}
}
