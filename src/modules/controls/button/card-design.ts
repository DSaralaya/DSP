
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';


@Component({
  selector: 'app-carddesgin',
  template: `
    <div class="card confirmation-card">
        <div class="card-block">
        <div class="row">
        <div class="col-sm-3">
            <i class="fa fa-check-square fa-cross" aria-hidden="true"></i>
        </div>
        <div class="col-sm-9">
                <h6 class="card-title">{{to.label}}</h6>
        </div>

        <div class="card-footer">
        <div class="row">
            <div class="col-sm-12 text-center">
                <button type="button" class="btn btn-outline-danger "
                (click)="selectCardDesign()">Yes</button>
            </div>

        </div>
    </div>
    `
})
export class CardDesginComponent extends FieldType {
    selectCardDesign() {
       // this.model[this.to.objectName][this.to.fieldName] = (this.to.maxlength) ? 'true' : true; ;
    }
}

