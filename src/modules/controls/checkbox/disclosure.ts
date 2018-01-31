import { Component, OnDestroy, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { error } from 'selenium-webdriver';
import { SimpleModalService } from 'ngx-simple-modal';
import { DisclousureModalComponent } from 'modules/modal/disclosureModal';

@Component({
	selector: 'app-disclousrecheckbox',
	template: `
  <div class="card">
  <div class="card-block">
  <div class="row">

            <div class='col-sm-10'>
            <p>{{to.label}}  <small>  <a class=""  (click)="disclosureModal()">{{field.data.disclosureLinkName}}</a></small></p>
            </div>
            <div class="col-sm-2">
                <button type="button" class="btn btn-primary" ngClass="{active : !!model[to.objectName][to.fieldName]}"
                (click)="model[to.objectName][to.fieldName] = !model[to.objectName][to.fieldName]">
                <span *ngIf="model[to.objectName][to.fieldName]"><i class="icon-check-sm"></i>Accepted</span>
                <span *ngIf="!model[to.objectName][to.fieldName]"><i class="icon-check-sm"></i>Accept</span>
                </button>

            </div>

 </div>
 </div></div>
    `
})
export class DisclousreComponent extends FieldType implements OnInit {
	constructor(private SimpleModalService: SimpleModalService) {
		super();
	}

	disclosureModal() {
		this.SimpleModalService.addModal(DisclousureModalComponent, { disclosureUrl: this.field['data']['disclosureUrl'] }, { closeOnEscape: false, closeOnClickOutside: false });
	}
}
