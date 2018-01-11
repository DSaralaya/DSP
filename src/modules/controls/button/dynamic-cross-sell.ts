
import { Component, OnDestroy, OnInit } from "@angular/core";
import { FieldType } from "@ngx-formly/core";


@Component({
  selector: "formly-field-dynamicCrossSell",
  template: `
  <div *ngIf="model[to.objectName][field.data.crossSellField]" class="col-sm-12">
    <div class="card">
        <div class="card-block cross-sell-block">
        <div class="row">
        <div class="col-sm-3">
            <i class="fa fa-check-square fa-cross" aria-hidden="true"></i>
        </div>
        <div class="col-sm-7">
                <h6 class="card-title">{{model[to.objectName][field.data.crossSellField]}}</h6>
        </div>
        </div>
            <p class="card-text">{{model[to.objectName][field.data.offerText]}}</p>
        </div>
        <div class="card-footer">
        <div class="row">
            <div class="col-sm-6">
                <button type="button" class="btn btn-outline-danger pull-right " 
                (click)="addCrossSell()">Yes</button>
            </div>
            <div class="col-sm-6 text-center">
            <button type="button" class="btn btn-outline-danger pull-left"  
             (click)="declineCrossSell()">No</button>
        </div>
        </div>
        <div class="overlay" *ngIf="model[to.objectName][to.fieldName]" >
             <i class="fa fa-check" aria-hidden="true"></i>
                    <h3>ADDED</h3>
            <a class="btn-remove-addon" 
            *ngIf="model[to.objectName][to.fieldName]" (click)="removeCrossSell()"><i class="fa fa-trash-o" aria-hidden="true"></i></a>
        </div>
        <div class="overlay" *ngIf="getAssginedDeclain()">
        <i class="fa fa-check" aria-hidden="true"></i>
            <h3>Not Interested</h3>
            <a class="btn-remove-addon" 
                    (click)="removeDeclined()"><i class="fa fa-trash-o" aria-hidden="true"></i></a>
         </div>
    </div>
    </div>

    `
})
export class DynamicCrossSell extends FieldType implements OnInit   {


    ngOnInit() {
           
     }

    removeDeclined()
    {
        this.assginDeclain(false);
    }
    removeCrossSell()                                                                                                                                                                                                                                                                                                                                                                                                                                                               
    {
        var offerObject = this.field['data']['offerObject'];
        var offerField = this.field['data']['offerField'];
        this.model[this.to.objectName][this.to.fieldName] = false;
        this.model[offerObject][offerField] = ' ';
    }
    declineCrossSell()
    {
        var offerObject = this.field['data']['offerObject'];
        var offerField = this.field['data']['offerField'];
        this.model[this.to.objectName][this.to.fieldName] = false;
        this.model[offerObject][offerField] = ' ';
        this.assginDeclain(true);
    }
    addCrossSell()
    {
        var offerObject = this.field['data']['offerObject'];
        var offerField = this.field['data']['offerField'];
        this.model[this.to.objectName][this.to.fieldName] = true;
        this.model[offerObject][offerField] =
        this.model[this.to.objectName][this.field['data']['crossSellField']];
    }

    assginDeclain(status: boolean) {
      if (this.to.fieldName === 'crossSell1') {
        this.model['crossSell1_offerDeclined'] = status;
      }
      if (this.to.fieldName === 'crossSell2') {
        this.model['crossSell2_offerDeclined'] = status;
      }
      if (this.to.fieldName === 'crossSell3') {
        this.model['crossSell3_offerDeclined'] = status;
      }
    }

     getAssginedDeclain() {
        if (this.to.fieldName === 'crossSell1') {
          return this.model['crossSell1_offerDeclined'];
        }
        if (this.to.fieldName === 'crossSell2') {
            return this.model['crossSell2_offerDeclined'];
        }
        if (this.to.fieldName === 'crossSell3') {
            return this.model['crossSell3_offerDeclined'];
        }
      }
  


    learnMore()
    {

    }
}

