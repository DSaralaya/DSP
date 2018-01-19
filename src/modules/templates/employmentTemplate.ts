import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-template',
  template: `
  <div class="card-header emphead">
  <h5>Employement Information : {{get()}}</h5>
  </div>

  `,
})
export class EmploymentTemplateComponent extends FieldType  {
    get() {
      const data = this.field['data'];
      return this.model[data['objectName']][data['firstName']] + ' ' + this.model[data['objectName']][data['lastName']];
    }
}
