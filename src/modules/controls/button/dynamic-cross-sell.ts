import { Component, OnDestroy, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
	selector: 'app-dynamic-cross-sell',
	template: `
  <div *ngIf="model[to.objectName][field.data.crossSellField]" class="">
	<div class="card cross-sell">
		<img class="card-img-top img-fluid" src="/assets/images/cross-sell1.jpg" alt="Cross Sell">
		<div class="card-header">
			<h6 class="card-title">{{model[to.objectName][field.data.crossSellField]}}</h6>
		</div>
		<div class="card-body">
			<p>{{model[to.objectName][field.data.offerText]}}</p>
		</div>
		<div class="card-footer">
			<ul class="list-inline text-right">
				<li class="list-inline-item"> <button type="button" class="btn" (click)="addCrossSell()"><i class="fa fa-check" aria-hidden="true"></i> Yes</button>
				<li class="list-inline-item"> <button type="button" class="btn" (click)="declineCrossSell()"><i class="fa fa-times" aria-hidden="true"></i> No</button>
			</ul>
		</div>


        <div class="overlay" *ngIf="model[to.objectName][to.fieldName]" >
             <i class="fa fa-check" aria-hidden="true"></i>
                    <h4>ADDED</h4>
            <a class="btn-remove-addon" title="Not intrested in this product" *ngIf="model[to.objectName][to.fieldName]" (click)="removeCrossSell()"><i class="fa fa-trash-o" aria-hidden="true"></i></a>
		</div>
		
        <div class="overlay" *ngIf="getAssginedDeclain()">
        	<i class="fa fa-times" aria-hidden="true"></i>
            <h4>NOT INTRESTED</h4>
            <a class="btn-remove-addon"
                    (click)="removeDeclined()"><i class="fa fa-trash-o" aria-hidden="true"></i></a>
         </div>
    </div>
	</div>
    `
})
export class DynamicCrossSellComponent extends FieldType {
	removeDeclined() {
		this.assginDeclain(false);
	}
	removeCrossSell() {
		const offerObject = this.field['data']['offerObject'];
		const offerField = this.field['data']['offerField'];
		this.model[this.to.objectName][this.to.fieldName] = false;
		this.model[offerObject][offerField] = ' ';
	}
	declineCrossSell() {
		const offerObject = this.field['data']['offerObject'];
		const offerField = this.field['data']['offerField'];
		this.model[this.to.objectName][this.to.fieldName] = false;
		this.model[offerObject][offerField] = ' ';
		this.assginDeclain(true);
	}
	addCrossSell() {
		const offerObject = this.field['data']['offerObject'];
		const offerField = this.field['data']['offerField'];
		this.model[this.to.objectName][this.to.fieldName] = true;
		this.model[offerObject][offerField] = this.model[this.to.objectName][this.field['data']['crossSellField']];
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

	learnMore() {}
}
