import { Component, OnDestroy, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'app-radio',
  template: `
  <div class="form-check form-check-inline" *ngFor="let item of items">
  <label class="form-check-label"  >
  <input class="form-check-input" type="radio" [value]="item.value" [formControl]="formControl"  [formlyAttributes]="field">
  {{ item.value}}
  </label>
</div>

    `
})
export class RadioComponent extends FieldType implements OnInit  {
    public items: any;
    ngOnInit() {
        this.items = this.to.options;
    }

}
