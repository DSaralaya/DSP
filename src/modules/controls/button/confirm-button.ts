import { Component, OnDestroy, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
	selector: 'app-confirm',
	template: `
    <div class="card confirmation-card">
        <div class="card-block">
        <div class="row">
          <h5>{{ field.data.confirmText}}</h5>
        </div>
        <div class="card-footer">
        <div class="row">
            <div class="col-sm-12 text-center">
                <button type="submit" class="btn btn-outline-danger">No</button>
                <button type="button" class="btn btn-outline-danger "
                (click)="selectAction()">Yes</button>
            </div>

        </div>
     </div>
</div>
    `
})
export class ConfirmButtonComponent extends FieldType {
    selectAction (){
       this.model[this.to['objectName']][this.to['fieldName']]=true;
    }
}
