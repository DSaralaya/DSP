
import { FormlyModule } from "@ngx-formly/core";
import { NgModule } from "@angular/core";
import { NgxMaskModule } from 'ngx-mask'
import { ValidationService } from "app/services/validation.service";
import { FormControl, Validators, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FormlyBootstrapModule } from "@ngx-formly/bootstrap";
import { FormlyInput } from "modules/controls/input/input";
import { FormlyInputMask } from "modules/controls/input/masking";
import { FormlySection } from "modules/wrappers/section";
import { FormlySelect } from "modules/controls/select/select";
import { CommonModule } from "@angular/common";
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';

import { FormlyCheckBox } from "modules/controls/checkbox/checkbox";
import { FormlyRadio } from "modules/controls/radio/radio";
import { SsnMask } from "modules/directives/ssnDir";
import { SSNInput } from "modules/controls/input/ssn";
import { JointApplicant } from "modules/controls/button/jointApplicant";
import { FormlyZipcode } from "modules/controls/input/zipcode";
import { FormGroup } from "@angular/forms/src/model";
import { NgModel } from "@angular/forms/src/directives/ng_model";
import { FieldType } from "@ngx-formly/core/src/templates/field.type";
import { PersonalInfoComponent } from "app/personal-info/personal-info.component";
import { saveforLater } from "modules/directives/saveforlaterDir";
import { SaveForLaterModal } from "modules/modal/saveforLaterModal";
import { SimpleModalModule } from 'ngx-simple-modal';
import { FormlyHiddenInput } from "modules/controls/input/hidden";
import { DynamicCrossSell } from "modules/controls/button/dynamic-cross-sell";
import { FormlyCurrency } from "modules/controls/input/currency";
import { CurrencyMaskModule } from "ng2-currency-mask";
import { FormlyOutputText } from "modules/controls/input/output";
import { FormlyReadOnly } from "modules/controls/input/readonly";
import { FormlyEmploymentTemplate } from "modules/templates/employmentTemplate";

export function showErrorOption(field) {
	if (field.to.hidden == true) {
		field.formControl.setValue(null);
		field.model[field.to['objectName']][field.to['fieldName']] = '';
		field.formControl.markAsUntouched();
	}

	return (field.formControl.touched) || (field.formState.submitted && !field.formControl.valid);
}

const formyconfig = FormlyModule.forRoot({
	extras: { showError: showErrorOption },
	types: [
		{ name: "input", component: FormlyInput },
		{ name: "select", component: FormlySelect },
		{ name: "checkbox", component: FormlyCheckBox },
		{ name: "radio-btn", component: FormlyRadio },
		{ name: "email", extends: 'input',
			defaultOptions: {
				validators: {
					invalidEmailAddress: (control: FormControl) =>
						ValidationService.email(control)
				}
			}
		},
		{ name: "masking",component: FormlyInputMask,wrappers: ["fieldset", "label"]},
		{ name: "phone", extends: 'masking',
			defaultOptions: {
				templateOptions: {
					mask: '(999) 999-9999'
				},
				validators: {
					invalidPhone: (control: FormControl) =>
						ValidationService.phone(control)
				}
			}
		}, 
		{ name: "month", extends: 'masking',
			defaultOptions: {
				templateOptions: {
					mask: '99'
				}
			}
		},
		{ name: "regex", extends: 'input',
			defaultOptions: {
				validators: {
					invalidRegex: (control: FormControl, field: any) =>
						ValidationService.regex(control, field)
				}
			}
		},
		{ name: "alphaNum", extends: 'input'},
		{ name: "ssn", component: SSNInput, wrappers: ["fieldset", "label"],
			defaultOptions: {
				validators: {
					invalidSSN: (control: FormControl, field: any) =>
						ValidationService.SSN(control, field)
				}
			}
		},
		{ name: "alphabet",extends: "input",
			defaultOptions: {
				validators: {
					invalidCharater: (control: FormControl, field: any) =>
						ValidationService.alphabet(control, field)
				}
			}
		},
		{ name: "dob",extends: "masking",
			defaultOptions: {
				templateOptions: {
					mask: '99/99/9999'
				},
				validators: {
					invalidDate: (control: FormControl, field: any) =>
						ValidationService.validDate(control, field),
					minorAge: (control: FormControl, field: any) =>
						ValidationService.minorAge(control, field),
					futuredate: (control: FormControl, field: any) =>
						ValidationService.fututeDate(control)
				}
			}
		},
		{ name: "future_date",extends: "masking",
			defaultOptions: {
				templateOptions: {
					mask: '99/99/9999'
				},
				validators: {
					invalidDate: (control: FormControl, field: any) =>
						ValidationService.validDate(control, field),
					futuredate: (control: FormControl, field: any) =>
						ValidationService.fututeDate(control)
				}
			}
		},
		{ name:"hidden" ,component:FormlyHiddenInput },
		{ name: "date",extends: "masking",
			defaultOptions: {
				templateOptions: {
					mask: '99/99/9999'
				},
				validators: {
					invalidDate: (control: FormControl, field: any) =>
						ValidationService.validDate(control, field)

				}
			}
		},
		{ name: "recentYear",extends: "date" },
		{ name: "pastDate",extends: "date",
			defaultOptions: {
				validators: {
					invalidPastDate: (control: FormControl) =>
						ValidationService.pastDate(control)
				}
			}
		},
		{ name: 'compareFields',
			defaultOptions: {
				validators: {
					invalidCompareFields: (control: FormControl, field: any) =>{
						return ValidationService.compareFields(control, field);
					}
						
				}
			}
		},
		{ name: "number", extends: "input" },
		{ name: "clear-field" },
		{ name: "zipcode", component: FormlyZipcode, wrappers: ["fieldset", "label"] },
		{ name: "joint-checkbox", component: JointApplicant },
		{ name: "online-cross-sell", component: DynamicCrossSell },
		{ name: "dynamic-cross-sell", component: DynamicCrossSell },
		{ name: "currency", component: FormlyCurrency },
		{ name: "read-only",component:FormlyReadOnly },
		{ name: "output", component:FormlyOutputText },
		{ name: "disclosure-toggle2", extends:"checkbox" },
		{ name:"template", 	 component:FormlyEmploymentTemplate}
	
	],
	validationMessages: [
		{
			name: "required",
			message: (err, field) => field['data'] && field['data']['validationMessage'] ? `${field['data']['validationMessage']}` : `${field.templateOptions.label.replace('(MM/DD/YYYY)','')} is required.`
		},
		{
			name: "invalidEmailAddress",
			message: (err, field) => "Invalid Email Address"
		},
		{
			name: "invalidCharater",
			message: (err, field) => field['data'] && field['data']['validationMessage'] ? `${field['data']['validationMessage']}` : "Invalid Character"
		},
		{
			name: "invalidCompareFields",
			message: (err, field) => field['data'] && field['data']['compareFieldsMessage'] ? `${field['data']['compareFieldsMessage']}` : "Must not be zero"
		},
		{
			name: "invalidRegex",
			message: (err, field) => field['data'] && field['data']['validationMessage'] ? `${field['data']['compareFieldsMessage']}` : "is not valid"
		},
		{ name: "minorAge", message: "Must be be 18 years to apply" },
		{ name: "futuredate", message: "Date cannot be grater than today" },
		{ name: "invalidDate", message: "Invalid Date" },
		{ name: "invalidSSN", message: "Invalid SSN" },
		{ name: "invalidPhone", message: "Invalid Phone Number" },
		{ name: "pastDate", message: "Date should be grater than today" }
	],
	wrappers: [{ name: "section", component: FormlySection }]
});

@NgModule({
	declarations: [
		FormlyInput, FormlySection, FormlyInputMask, FormlySelect, FormlyCheckBox, FormlyRadio, SsnMask, SSNInput,
		JointApplicant, FormlyZipcode,saveforLater,SaveForLaterModal,FormlyHiddenInput,DynamicCrossSell,FormlyCurrency,
		FormlyOutputText,FormlyReadOnly,FormlyEmploymentTemplate
	],
	imports: [
		CommonModule, FormsModule, ReactiveFormsModule, FormlyBootstrapModule, NgxMaskModule.forRoot(),
		formyconfig, MatInputModule, MatSelectModule, MatCheckboxModule, MatButtonModule,
		SimpleModalModule.forRoot({container: "modal-container"}),CurrencyMaskModule

	],
	entryComponents: [
        SaveForLaterModal
      ],
	exports: [ReactiveFormsModule, FormlyBootstrapModule, FormsModule, FormlyModule,saveforLater,SimpleModalModule],

})
export class FormlyControls {
}