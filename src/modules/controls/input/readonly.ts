import { FieldType } from '@ngx-formly/core';
import { OnInit, Component } from '@angular/core';

@Component({
    selector: 'app-readonly;',
    template: `
    <mat-form-field>
      <input matInput [id]="id"  placeholder="{{to.label}}  {{to.required? '*':''}}"  [type]="type" [maxlength]="maxlength" [formControl]="formControl"
        [formlyAttributes]="field" readonly="true" >
        </mat-form-field>
      `
  })

export class ReadOnlyComponent extends FieldType implements OnInit {
    ngOnInit() {}
  }
