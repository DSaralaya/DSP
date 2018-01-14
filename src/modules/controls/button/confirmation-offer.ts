
import { Component, OnDestroy, OnInit } from "@angular/core";
import { FieldType } from "@ngx-formly/core";


@Component({
  selector: "formly-field-dynamicCrossSell",
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
        </div>
            <p class="card-text">{{field.data.offerDescription}}</p>
        </div>
        <div class="card-footer">
        <div class="row">
            <div class="col-sm-12 text-center">
                <button type="button" class="btn btn-outline-danger " 
                (click)="addConfirmationOffer()">Yes</button>
            </div>
           
        </div>
        <div class="overlay" *ngIf="model[to.objectName][to.fieldName]" >
             <i class="fa fa-check" aria-hidden="true"></i>
                    <h3>ADDED</h3>
            <a class="btn-remove-addon" 
            *ngIf="model[to.objectName][to.fieldName]" (click)="removeConfirmationOffer()"><i class="fa fa-trash-o" aria-hidden="true"></i></a>
        </div>
  
    </div>
   

    `
})
export class ConfirmationOffer extends FieldType {

   
    addConfirmationOffer()
    {
        this.model[this.to.objectName][this.to.fieldName] = (this.to.maxlength) ? 'true' : true; ;
    }

    removeConfirmationOffer()
    {
        this.model[this.to.objectName][this.to.fieldName] = (this.to.maxlength) ? 'false' : false; ;
    }
    
    
}

