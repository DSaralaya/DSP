import { Component } from '@angular/core';
import { SimpleModalComponent, SimpleModalOptions } from 'ngx-simple-modal';
import { FormGroup } from '@angular/forms';
import { LocalService } from 'app/services/localJson.service';
import { FormlyFormOptions } from '@ngx-formly/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

export interface ConfirmModel {
  title: string;
  message: string;
}

@Component({
  selector: 'app-saveconfirm',
  template: `
    <div class="modal-dialog">
    <form [formGroup]="form" (ngSubmit)="confirm()">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">{{ pageTitle}}</h5>
        <button type="button" (click)="close()" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <formly-form [model]="model" [fields]="fields" [options]="options" [form]="form">
        </formly-form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary"  (click)="close()">Close</button>
        <button type="submit" class="btn btn-primary">Save changes</button>
      </div>
    </div>
    </form>
  </div>

    `
})
export class SaveForLaterModalComponent extends SimpleModalComponent <ConfirmModel, boolean> implements OnInit {
  public model: any;
  public fields: any;
  form = new FormGroup({});
  public pageTitle = 'Save Your Application';
  public options: any = {
    formState: {
      submitted: false
    }
  };

  constructor(private service: LocalService) {
    super();
  }

  ngOnInit() {
    this.getAppFields();
  }
  getAppFields() {
    this.service.get('save-for-later').subscribe(result => {
      this.fields = result.fields;
      this.model = result;
      delete this.model['fields'];
    });
  }

  confirm() {
    this.options.formState.submitted = true;
    if (this.form.valid) {
      this.result = true;
      this.close();
    }
  }
}

