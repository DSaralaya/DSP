import { Component, OnInit } from '@angular/core';
import { FieldArrayType, FormlyFormBuilder, FormlyFormOptions, FormlyFieldConfig, FormlyTemplateOptions } from '@ngx-formly/core';
import { FormGroup } from '@angular/forms';
import clone from 'lodash.clonedeep';


@Component({
  selector: 'repeat-screen',
  templateUrl: 'repeat-screen.html'
})
export class RepeatScreenComponent extends FieldArrayType implements OnInit {

    showForm = false;
    singleForm = new FormGroup({});
    showList=true;
    singleField = [];
    mdl={};
    ops: any = {
        formState: {
          model: this.mdl,
          curIndex:-1,
        }
    };
  
    curIndex=-1;
    constructor(builder: FormlyFormBuilder) {
      super(builder);
    }
    
    ngOnInit() {
      this.singleField = clone(this.field.fieldArray.fieldGroup);
    }

    addOrUpdate(){
      debugger;
      if(this.mdl['form'] && this.mdl['form'].length>0){
        this.ops.formState.submitted = true;
        if (this.singleForm.valid) {
          if(this.curIndex===-1){
            this.mdl[Object.keys(this.mdl)[0]].forEach(item => {
              var ob={};
              ob=clone(item);
              if(this.to.firstScreen) {
                ob[this.to.firstScreen]=this.mdl[this.to.firstScreen];
              }
              this.field.parent.model[this.to.key].push(ob);
            });
          } else {
            var ob={};
              ob=clone(this.mdl['form'][0]);
              if(this.to.firstScreen) {
                ob[this.to.firstScreen]=this.mdl[this.to.firstScreen];
              }
              this.field.parent.model[this.to.key][this.curIndex]=clone(ob);
          }
          this.hideForm();
      }
        
      } else{
        this.hideForm();
      }
    }
  
    addNew(){
      delete this.mdl[this.to.firstScreen];
      delete this.mdl['form'];
      this.singleForm = new FormGroup({});
      this.showList=false;
      this.showForm = true;
     
      this.mdl['form']=[];
      this.mdl['form'].push({});
      this.ops.formState.submitted = false;
    };
  
    hideForm() {
      this.showForm = false;
      this.ops.resetModel();
      delete this.mdl[this.to.firstScreen];
      delete this.mdl['form'];
      this.showList=true;
      this.curIndex=this.ops.formState.curIndex=-1;
    }
  
    edit(index) {
      this.curIndex=this.ops.formState.curIndex=index;
      this.showList=false;
      this.showForm=true;
      var mdl=clone(this.field.parent.model[this.to.key][index]);
      delete mdl['form'];
      this.mdl['form']=[];
      if(this.to.firstScreen){
        this.mdl[this.to.firstScreen]=mdl[this.to.firstScreen];
      }
      delete mdl[this.to.firstScreen];
      this.mdl['form'].push(mdl);
    }

    cancel(){
    
      this.ops.formState.submitted=false;
      this.ops.resetModel();
      this.showForm = false;
      this.addNew();
     
    }

    delete(index){
      this.field.parent.model[this.to.key].splice(index,1);
    }
}

