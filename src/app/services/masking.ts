import { Injectable, Component, OnInit } from "@angular/core";
import { FormsModule, FormGroup } from "@angular/forms";
import { FieldType } from "@ngx-formly/core";

@Component({
  selector: "masking",
  template: `
    <input [textMask]="{mask: mask,guide:false}"  [formControl]="formControl" [formlyAttributes]="field" type="text" class="form-control"  />
    `
})
export class maskService extends FieldType implements OnInit {
  public mask=[];
  public zip = [/\d/, /\d/, /\d/, /\d/, /\d/,'-',/\d/, /\d/, /\d/, /\d/];
  public date=[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  public phone=['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
 
  ngOnInit() {
    if (this.to.Mask == "zipcode") {
      this.mask = this.zip;
    } else if (this.to.Mask == "date") {
      this.mask = this.date;
    } else if (this.to.Mask == "phone") {
      this.mask = this.phone;
    }
  }
}
