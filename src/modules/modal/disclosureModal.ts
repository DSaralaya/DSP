import { Component } from '@angular/core';
import { SimpleModalComponent, SimpleModalOptions } from 'ngx-simple-modal';
import { FormGroup } from '@angular/forms';
import { LocalService } from 'app/services/localJson.service';
import { FormlyFormOptions } from '@ngx-formly/core';
import { DomSanitizer } from '@angular/platform-browser';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

export interface ConfirmModel {
  title: string;
  message: string;
}

@Component({
  selector: 'app-disclousremodal',
  template: `
    <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">{{ pageTitle}}</h5>
        <button type="button" (click)="close()" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <iframe id="disclosure-frame" width="100%" height="600" frameborder="0" src="{{disclosureUrl}}">
    </iframe>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary"  (click)="close()">I do not accept</button>
        <button type="submit" class="btn btn-primary">I accept</button>
      </div>
    </div>
  </div>
    `
})

export class DisclousureModalComponent extends SimpleModalComponent <ConfirmModel, boolean> implements OnInit {
  public fields: any;
  private disclosureUrl: any;
  public pageTitle = 'Disclousre';
  constructor(private sanitizer: DomSanitizer) {
    super();
  }

  ngOnInit() {
    this.disclosureUrl = this.sanitizer.bypassSecurityTrustUrl(this.fields.data.disclosureUrl);
  }

  confirm() {
    this.result = true;
    this.close();
  }
}

