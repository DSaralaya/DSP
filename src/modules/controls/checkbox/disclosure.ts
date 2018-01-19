import { Component, OnDestroy, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { error } from 'selenium-webdriver';
import { SimpleModalService } from 'ngx-simple-modal';
import { DisclousureModalComponent } from 'modules/modal/disclosureModal';

@Component({
  selector: 'app-disclousrecheckbox',
  template: `
 <div class="col-sm-12">
 <div class='col-sm-8'>
 <p>{{options.data.textBeforeDisclosure}}</p>
 <a class="btn btn-primary"  (click)="disclosureModal()">{{field.data.disclosureLinkName}}</a>
 </div>
 <div class="col-sm-4">
    <button type="button" class="btn-toggle-active check-box smooth-hover" ngClass="{active : !!model[to.objectName][to.fieldName]}"
    [(ngModel)]="model[to.objectName][to.fieldName]" (click)="model[to.objectName][to.fieldName] = !model[to.objectName][to.fieldName]">
    <span *ngIf="model[to.objectName][to.fieldName]"><i class="icon-check-sm"></i>Accepted</span>
    <span *ngIf="!model[to.objectName][to.fieldName]"><i class="icon-check-sm"></i>Accept</span>
    </button>
    <input type="checkbox"  [formControl]="formControl" [id]="id" [formlyAttributes]="field"  class="hidden">
 </div>
 </div>
    `
})
export class DisclousreComponent extends FieldType implements OnInit  {

    constructor(private SimpleModalService: SimpleModalService) {
        super();
    }

    disclosureModal() {
        this.SimpleModalService.addModal(DisclousureModalComponent, {}, { closeOnEscape: false, closeOnClickOutside: false});
    }
}
