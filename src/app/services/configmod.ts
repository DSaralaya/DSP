import { currencyService } from "app/services/currency";
import { maskService } from "app/services/masking";
import { FormlyFieldInput } from "app/services/input";
import { FormlyPanelWrapper } from "app/services/wrapper";
import { FormlyModule } from "@ngx-formly/core";
import { NgModule } from "@angular/core";
import { CurrencyMaskModule } from "ng2-currency-mask";
import { TextMaskModule } from "angular2-text-mask";
import { ValidationService } from "app/services/validation.service";
import { FormControl, Validators } from "@angular/forms";

export const Configmod = FormlyModule.forRoot({
  types: [
    { name: "input", component: FormlyFieldInput },
    { name: "section", component: FormlyPanelWrapper },
    {
      name: "alphabet",
      extends: "input",
      defaultOptions: {
        validators: {
          invalidCharater: (control: FormControl, field: any) => {
            return ValidationService.alphabetValidator(control, field);
          }
        }
      }
    },
    {
      name: "Currency",
      component: currencyService,
      wrappers: ["fieldset", "label"]
    },
    {
      name: "masking",
      component: maskService,
      wrappers: ["fieldset", "label"]
    },
    {
      name: "dob",
      extends: "masking",
      defaultOptions: {
        validators: {
          invalidDate: (control: FormControl, field: any) =>
            ValidationService.validDateValidator(control, field),
          minorAge: (control: FormControl, field: any) =>
            ValidationService.minorAgeValidation(control, field),
          futuredate: (control: FormControl, field: any) =>
            ValidationService.fututeDateValidation(control)
        }
      }
    }
  ],

  validationMessages: [
    {
      name: "required",
      message: (err, field) => `${field.templateOptions.label} is required.`
    },
    { name: "invalidEmailAddress", message: "Invalid Email Address" },
    { name: "invalidCharater", message: "Invalid Character" },
    { name: "minorAge", message: "Must be be 18 years to apply" },
    { name: "futuredate", message: "Date cannot be grater than today" },
    { name: "invalidDate", message: "Invalid Date" }
  ],
  wrappers: [{ name: "section", component: FormlyPanelWrapper }]
});
