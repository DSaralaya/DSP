
import { FormlyModule } from "@ngx-formly/core";
import { NgModule } from "@angular/core";
import { NgxMaskModule } from 'ngx-mask'
import { ValidationService } from "app/services/validation.service";
import { FormControl, Validators, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FormlyBootstrapModule } from "@ngx-formly/bootstrap";
import { FormlyInput } from "modules/controls/input/input";
import { FormlyInputMask } from "modules/controls/input/masking";
import { FormlySection } from "modules/wrappers/section";
import { ModalModule } from 'ngx-modialog';
import { BootstrapModalModule } from 'ngx-modialog/plugins/bootstrap';
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

export function showErrorOption(field) {
	if (field.to.hidden == true) {
		field.formControl.setValue(null);
		field.model[field.to['objectName']][field.to['fieldName']] = '';
		field.formControl.markAsUntouched();
	}
	
 console.log(field);
	return (field.formControl.touched) || !field.formControl.valid;
}

const formyconfig = FormlyModule.forRoot({
	//extras: { showError: showErrorOption },
	types: [
		{ name: "input", component: FormlyInput },
		{ name: "select", component: FormlySelect },
		{ name: "checkbox", component: FormlyCheckBox },
		{ name: "radio", component: FormlyRadio },
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
					InvalidCompareFields: (control: FormControl, field: any) =>
						ValidationService.compareFields(control, field)
				}
			}
		},
		{ name: "number", extends: "input" },
		{ name: "clear-field" },
		{ name: "zipcode", component: FormlyZipcode, wrappers: ["fieldset", "label"] },
		{ name: "joint-checkbox", component: JointApplicant },
	],
	validationMessages: [
		{
			name: "required",
			message: (err, field) => field['data'] && field['data']['validationMessage'] ? `${field['data']['validationMessage']}` : `${field.templateOptions.label} is required.`
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
			name: "InvalidCompareFields",
			message: (err, field) => field['data'] && field['data']['compareFieldsMessage'] ? `${field['data']['compareFieldsMessage']}` : "Must not be zero"
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
		JointApplicant, FormlyZipcode
	],
	imports: [
		CommonModule, FormsModule, ReactiveFormsModule, FormlyBootstrapModule, NgxMaskModule.forRoot(),
		ModalModule.forRoot(), BootstrapModalModule,
		formyconfig, MatInputModule, MatSelectModule, MatCheckboxModule, MatButtonModule

	],
	exports: [ReactiveFormsModule, FormlyBootstrapModule, FormsModule, FormlyModule],

})
export class FormlyControls {
}