import { Directive, Attribute, HostListener, ElementRef, ViewContainerRef } from "@angular/core";
import { NgModel } from "@angular/forms";
import { FieldType } from "@ngx-formly/core";
import { OnInit } from "@angular/core/src/metadata/lifecycle_hooks";


@Directive({ 
    selector: '[currencymask]', 
   
    providers: [NgModel]
})

export class CurrencyMask implements OnInit{
    viewValue: string;
    oldValue:string;
    regex = new RegExp(/^[0-9]+([,.][0-9]+)?$/g);
    model:any;
    field:any;
    constructor(public cmodel:NgModel,public el: ElementRef,private vcRef: ViewContainerRef){
    }
    ngOnInit()
    {
        var Component = this.vcRef['_view']['component'];
        this.model=Component['model'];
        this.field=Component['field'];
        this.format();
    }

    format()
    {
        var value=this.model[this.field.templateOptions['objectName']][this.field.templateOptions['fieldName']];
        if(value && value.toString().length>0)
        {
            var v= '$ '+parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
            this.cmodel.valueAccessor.writeValue(v);
            this.oldValue = v;
        }
     
    }
    @HostListener('blur', ['$event'])
    onBlur(){
        if(this.el.nativeElement.value.length>0)
        {
            var  nvalue= this.el.nativeElement.value.replace(/,/g , "").replace('$ ','');
            var v='$ '+parseFloat(nvalue).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
            this.viewValue = v;
            this.cmodel.valueAccessor.writeValue(this.viewValue);
            //this.cmodel.viewToModelUpdate(nvalue);
            this.model[this.field.templateOptions['objectName']][this.field.templateOptions['fieldName']]=nvalue;
       
        }
    }

    @HostListener('input', ['$event'])
    inputHandler()
    {
       
        var  nvalue= this.el.nativeElement.value;
       var  newValue=nvalue.split('.')[0].replace(/,/g , "").replace('$ ','');
        var isvalid=true;
      if(nvalue.split('.').length>1 && nvalue.split('.')[1].length>2)
      {
        isvalid=false;
      }
     if(newValue.length>0 && newValue.length <16 && newValue.match(this.regex) && isvalid) {
         var afercomma='';
         if(nvalue.split('.').length>1)
         {
             if(nvalue.split('.')[1].length>0)
             {
                afercomma="."+nvalue.split('.')[1];
             }
             else{
                 afercomma=".";
             }
         }
        //var v=parseFloat(newValue).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
        var v=this.Comma(newValue)+afercomma;
        this.viewValue ='$ '+ v;
        this.cmodel.viewToModelUpdate(newValue);
        this.cmodel.valueAccessor.writeValue(this.viewValue);
    }
    else if(newValue.length>0){
       this.cmodel.valueAccessor.writeValue(this.oldValue);
     
    }
    else{
        this.cmodel.viewToModelUpdate('');
        this.cmodel.valueAccessor.writeValue('');
    }
    }
    
    @HostListener('keydown', ['$event'])
    onKeyDown(e:Event){
        this.oldValue =  this.el.nativeElement.value;
    }
    Comma(Num) { //function to add commas to textboxes
        Num += '';
        Num = Num.replace(',', ''); Num = Num.replace(',', ''); Num = Num.replace(',', '');
        Num = Num.replace(',', ''); Num = Num.replace(',', ''); Num = Num.replace(',', '');
        var x = Num.split('.');
       var x1 = x[0];
        var x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1))
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        return x1 + x2;
    }
    
}