import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';

@Component({
  selector: 'formly-wrapper-panel',
  template: `
    <div class="card">
      <div class="card-block">
        <ng-container #fieldComponent></ng-container>
      </div>
    </div>
  `,
})
export class PanelWrapperComponent extends FieldWrapper {
  @ViewChild('fieldComponent', {read: ViewContainerRef}) fieldComponent: ViewContainerRef;
}