import { FieldType } from '@ngx-formly/core';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-outputtext',
    template: `
    <div class="form-group">
    <label for="{{id}}">{{to.label}}</label>
    <p><b> {{model[to.objectName][to.fieldName]}}</b></p>
    </div>
      `
  })
  export class OutputTextComponent extends FieldType implements OnInit {
    ngOnInit() {}
  }
