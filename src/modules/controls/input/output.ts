import { FieldType } from "@ngx-formly/core";
import { Component, OnInit } from "@angular/core";

@Component({
    selector: "outputtext",
    template: `
    <div class="form-group">
    <label for="{{id}}">{{to.label}}</label>
    <p><b> {{model[to.objectName][to.fieldName]}}</b></p>
    </div>
      `
  })
  export class FormlyOutputText extends FieldType implements OnInit {
    ngOnInit() {}
  }