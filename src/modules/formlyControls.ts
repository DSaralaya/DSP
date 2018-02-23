import { FormlyModule } from '@ngx-formly/core';
import { NgModule } from '@angular/core';
import { NgxMaskModule } from 'ngx-mask';

import { FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { InputComponent } from 'modules/controls/input/input';
import { InputMaskComponent } from 'modules/controls/input/masking';
import { SectionComponent } from 'modules/wrappers/section';
import { SelectComponent } from 'modules/controls/select/select';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';

import { CheckBoxComponent } from 'modules/controls/checkbox/checkbox';
import { RadioComponent } from 'modules/controls/radio/radio';
import { SsnMaskDirective } from 'modules/directives/ssnDir';
import { SSNInputComponent } from 'modules/controls/input/ssn';
import { JointApplicantComponent } from 'modules/controls/button/jointApplicant';
import { ZipcodeComponent } from 'modules/controls/input/zipcode';
import { FormGroup } from '@angular/forms/src/model';
import { NgModel } from '@angular/forms/src/directives/ng_model';
import { FieldType } from '@ngx-formly/core/src/templates/field.type';
import { SaveforLaterDirective } from 'modules/directives/saveforlaterDir';
import { SaveForLaterModalComponent } from 'modules/modal/saveforLaterModal';
import { SimpleModalModule } from 'ngx-simple-modal';
import { HiddenInputComponent } from 'modules/controls/input/hidden';
import { DynamicCrossSellComponent } from 'modules/controls/button/dynamic-cross-sell';
import { CurrencyComponent } from 'modules/controls/input/currency';
import { OutputTextComponent } from 'modules/controls/input/output';
import { ReadOnlyComponent } from 'modules/controls/input/readonly';
import { EmploymentTemplateComponent } from 'modules/templates/employmentTemplate';
import { CurrencyMaskDirective } from 'modules/directives/currencymask';
import { ConfirmationOfferComponent } from 'modules/controls/button/confirmation-offer';
import { CardDesginComponent } from 'modules/controls/button/card-design';
import { DisclousreComponent } from 'modules/controls/checkbox/disclosure';
import { Component } from '@angular/core/src/metadata/directives';
import { DisclousureModalComponent } from 'modules/modal/disclosureModal';
import { NgUploaderModule } from 'ngx-uploader';
import { DriverLicesenceScanComponent } from './templates/driverScan';
import { ValidationService } from '../app/shared/services/validation.service';
import { UiPropertiesModalComponent } from '../app/ui-form/ui-properties.component';
import { PanelWrapperComponent } from './wrappers/panel';


export function showErrorOption(field) {
	if (field.to.hidden === true) {
		field.formControl.setValue(null);
		field.model[field.to['objectName']][field.to['fieldName']] = '';
		field.formControl.markAsUntouched();
	}

	return (field.formControl && field.formControl.touched) || (field.formState.submitted && !field.formControl.valid);
}

const formyconfig = FormlyModule.forRoot({
	extras: { showError: showErrorOption },
	types: [
		{ name: 'input', component: InputComponent },
		{ name: 'select', component: SelectComponent },
		{ name: 'checkbox', component: CheckBoxComponent },
		{ name: 'radio-btn', component: RadioComponent },
		{
			name: 'email',
			extends: 'input',
			defaultOptions: {
				validators: {
					invalidEmailAddress: (control: FormControl) => ValidationService.email(control)
				}
			}
		},
		{ name: 'masking', component: InputMaskComponent, wrappers: [ 'fieldset', 'label' ] },
		{
			name: 'phone',
			extends: 'masking',
			defaultOptions: {
				templateOptions: {
					mask: '(999) 999-9999'
				},
				validators: {
					invalidPhone: (control: FormControl) => ValidationService.phone(control)
				}
			}
		},
		{
			name: 'month',
			extends: 'input'
		},
		{
			name: 'regex',
			extends: 'input',
			defaultOptions: {
				validators: {
					invalidRegex: (control: FormControl, field: any) => ValidationService.regex(control, field)
				}
			}
		},
		{ name: 'alphaNum', extends: 'input' },
		{
			name: 'ssn',
			component: SSNInputComponent,
			wrappers: [ 'fieldset', 'label' ],
			defaultOptions: {
				validators: {
					invalidSSN: (control: FormControl, field: any) => ValidationService.SSN(control, field)
				}
			}
		},
		{
			name: 'alphabet',
			extends: 'input',
			defaultOptions: {
				validators: {
					invalidCharater: (control: FormControl, field: any) => ValidationService.alphabet(control, field)
				}
			}
		},
		{
			name: 'dob',
			extends: 'masking',
			defaultOptions: {
				templateOptions: {
					mask: '99/99/9999'
				},
				validators: {
					invalidDate: (control: FormControl, field: any) => ValidationService.validDate(control, field),
					minorAge: (control: FormControl, field: any) => ValidationService.minorAge(control, field),
					futuredate: (control: FormControl, field: any) => ValidationService.fututeDate(control)
				}
			}
		},
		{
			name: 'future_date',
			extends: 'masking',
			defaultOptions: {
				templateOptions: {
					mask: '99/99/9999'
				},
				validators: {
					invalidDate: (control: FormControl, field: any) => ValidationService.validDate(control, field),
					futuredate: (control: FormControl, field: any) => ValidationService.fututeDate(control)
				}
			}
		},
		{ name: 'hidden', component: HiddenInputComponent },
		{
			name: 'date',
			extends: 'masking',
			defaultOptions: {
				templateOptions: {
					mask: '99/99/9999'
				},
				validators: {
					invalidDate: (control: FormControl, field: any) => ValidationService.validDate(control, field)
				}
			}
		},
		{ name: 'recentYear', extends: 'date' },
		{
			name: 'pastDate',
			extends: 'date',
			defaultOptions: {
				validators: {
					invalidPastDate: (control: FormControl) => ValidationService.pastDate(control)
				}
			}
		},
		{
			name: 'compareFields',
			defaultOptions: {
				validators: {
					invalidCompareFields: (control: FormControl, field: any) => {
						return ValidationService.compareFields(control, field);
					}
				}
			}
		},
		{ name: 'number', extends: 'input' },
		{ name: 'clear-field' },
		{ name: 'zipcode', component: ZipcodeComponent, wrappers: [ 'fieldset', 'label' ] },
		{ name: 'joint-checkbox', component: JointApplicantComponent },
		{ name: 'online-cross-sell', component: DynamicCrossSellComponent },
		{ name: 'dynamic-cross-sell', component: DynamicCrossSellComponent },
		{ name: 'currency', component: CurrencyComponent, wrappers: [ 'fieldset', 'label' ] },
		{ name: 'read-only', component: ReadOnlyComponent, wrappers: [ 'fieldset', 'label' ] },
		{ name: 'output', component: OutputTextComponent },
		{ name: 'template', component: EmploymentTemplateComponent },
		{ name: 'confirmation-offer', component: ConfirmationOfferComponent },
		{
			name: 'NoPOBox',
			extends: 'input',
			defaultOptions: {
				validators: {
					invalidPoBox: (control: FormControl) => ValidationService.nopobox(control)
				}
			}
		},
		// need to add
		{ name: 'select-card-design', component: CardDesginComponent },
		{ name: 'ui-select-single-async', extends: 'select' },
		{ name: 'compareFields-phone', extends: 'input' },
		{ name: 'output-text', extends: 'input' },
		{ name: 'copy-address-field', extends: 'input' },
		{ name: 'copy-address-select', extends: 'select' },
		{ name: 'copy-address', extends: 'checkbox' },
		{ name: 'promo', extends: 'input' },
		{ name: 'city', extends: 'input' },
		{ name: 'disclosure-toggle', component: DisclousreComponent },
		{ name: 'dlscan', component: DriverLicesenceScanComponent }
	],

	validationMessages: [
		{
			name: 'required',
			message: (err, field) => (field['data'] && field['data']['validationMessage'] ? `${field['data']['validationMessage']}` : `${field.templateOptions.label.replace('(MM/DD/YYYY)', '')} is required.`)
		},
		{
			name: 'invalidEmailAddress',
			message: (err, field) => 'Invalid Email Address'
		},
		{
			name: 'invalidCharater',
			message: (err, field) => (field['data'] && field['data']['validationMessage'] ? `${field['data']['validationMessage']}` : 'Invalid Character')
		},
		{
			name: 'invalidCompareFields',
			message: (err, field) => (field['data'] && field['data']['compareFieldsMessage'] ? `${field['data']['compareFieldsMessage']}` : 'Must not be zero')
		},
		{
			name: 'invalidRegex',
			message: (err, field) => (field['data'] && field['data']['validationMessage'] ? `${field['data']['compareFieldsMessage']}` : 'is not valid')
		},
		{ name: 'minorAge', message: 'Must be be 18 years to apply' },
		{ name: 'futuredate', message: 'Date cannot be grater than today' },
		{ name: 'invalidDate', message: 'Invalid Date' },
		{ name: 'invalidSSN', message: 'Invalid SSN' },
		{ name: 'invalidPhone', message: 'Invalid Phone Number' },
		{ name: 'pastDate', message: 'Date should be grater than today' },
		{ name: 'invalidPoBox', message: 'Invalid PO Box' }
	],
	wrappers: [ { name: 'section', component: SectionComponent } ]
});

@NgModule({
	declarations: [
		InputComponent,
		SectionComponent,
		InputMaskComponent,
		SelectComponent,
		CheckBoxComponent,
		RadioComponent,
		SsnMaskDirective,
		SSNInputComponent,
		JointApplicantComponent,
		ZipcodeComponent,
		SaveforLaterDirective,
		SaveForLaterModalComponent,
		HiddenInputComponent,
		DynamicCrossSellComponent,
		CurrencyComponent,
		OutputTextComponent,
		ReadOnlyComponent,
		EmploymentTemplateComponent,
		CurrencyMaskDirective,
		ConfirmationOfferComponent,
		CardDesginComponent,
		DisclousreComponent,
		DisclousureModalComponent,
		DriverLicesenceScanComponent,
		UiPropertiesModalComponent
	],
	imports: [ CommonModule, FormsModule, ReactiveFormsModule, FormlyBootstrapModule, NgxMaskModule.forRoot(), formyconfig, MatInputModule, MatSelectModule, MatCheckboxModule, MatButtonModule, SimpleModalModule.forRoot({ container: 'modal-container' }), NgUploaderModule ],
	entryComponents: [ SaveForLaterModalComponent, DisclousureModalComponent, UiPropertiesModalComponent ],
	exports: [ ReactiveFormsModule, FormlyBootstrapModule, FormsModule, FormlyModule, SaveforLaterDirective, SimpleModalModule ]
})
export class FormlyControls {}
