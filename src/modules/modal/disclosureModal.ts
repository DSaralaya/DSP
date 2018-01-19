import { Component } from '@angular/core';
import { SimpleModalComponent, SimpleModalOptions } from 'ngx-simple-modal';
import { FormGroup } from '@angular/forms';
import { LocalService } from 'app/services/localJson.service';
import { FormlyFormOptions } from '@ngx-formly/core';
import { DomSanitizer } from '@angular/platform-browser';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

export interface Idisclousremodel {
  disclosureUrl: string;
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
      <iframe id="disclosure-frame" width="100%" height="600" frameborder="0" [src]="getUrl()">
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

export class DisclousureModalComponent extends SimpleModalComponent <Idisclousremodel, boolean>  {
  public fields: any;
  disclosureUrl: any;
  public pageTitle = 'Disclousre';
  constructor(private sanitizer: DomSanitizer) {
    super();
  }

  getUrl() {
     return  this.sanitizer.bypassSecurityTrustResourceUrl(this.disclosureUrl);
  }

  confirm() {
    this.result = true;
    this.close();
  }
}

