import { FormlyModule } from '@ngx-formly/core';
import { NgModule } from '@angular/core';
import { NgxMaskModule } from 'ngx-mask';

import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InputMaskComponent } from './controls/input/masking';
import { SectionComponent } from './wrappers/section';
import { SelectComponent } from './controls/select/select';
import { NGXSelectComponent } from './controls/select/ng-select';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CheckBoxComponent } from './controls/checkbox/checkbox';

import { RadioComponent } from './controls/radio/radio';
import { SsnMaskDirective } from './directives/ssnDir';
import { SSNInputComponent } from './controls/input/ssn';
import { JointApplicantComponent } from './controls/button/jointApplicant';
import { ZipcodeComponent } from './controls/input/zipcode';
import { SaveforLaterDirective } from './directives/saveforlaterDir';
import { SaveForLaterModalComponent } from './modal/saveforLaterModal';
import { SimpleModalModule } from 'ngx-simple-modal';
import { HiddenInputComponent } from './controls/input/hidden';
import { DynamicCrossSellComponent } from './controls/button/dynamic-cross-sell';
import { CurrencyComponent } from './controls/input/currency';
import { OutputTextComponent } from './controls/input/output';
import { ReadOnlyComponent } from './controls/input/readonly';
import { EmploymentTemplateComponent } from './templates/employmentTemplate';
import { CurrencyMaskDirective } from './directives/currencymask';
import { ConfirmationOfferComponent } from './controls/button/confirmation-offer';
import { CardDesginComponent } from './controls/button/card-design';
import { DisclousreComponent } from './controls/checkbox/disclosure';
import { DisclousureModalComponent } from './modal/disclosureModal';
import { NgxUploaderModule } from 'ngx-uploader';
import { DriverLicesenceScanComponent } from './templates/driverScan';
import { ValidationService } from '../app/shared/services/validation.service';

import { InputComponent } from './controls/input/input';
import { FormlyMatFormFieldModule } from '@ngx-formly/material/form-field';
import { RepeatTypeComponent } from './controls/button/repeat-section';
import { RepeatScreenComponent } from './controls/other/repeat-screen';
import { NgSelectModule } from '@ng-select/ng-select';
import { ToggleComponent } from './controls/radio/toggle';
import { ProductSelectComponent } from './controls/radio/product-select';

export function showErrorOption(field) {
	if (field.to.hidden === true) {
		field.formControl.setValue(null);
		field.model[field.to['objectName']][field.to['fieldName']] = '';
		field.formControl.markAsUntouched();
	}

	return (field.formControl && field.formControl.touched && !field.formControl.valid) || (field.formState.submitted && !field.formControl.valid);
}

const formyconfig = FormlyModule.forRoot({
	extras: { showError: showErrorOption },
	types: [
		{ name: 'input', component: InputComponent, wrappers: [ 'form-field' ] },
		{ name: 'select', component: SelectComponent, wrappers: [ 'form-field' ] },
		{ name: 'ng-select', component: NGXSelectComponent, wrappers: [ 'form-field' ] },
		{ name: 'checkbox', component: CheckBoxComponent },
		{ name: 'toggle', component: ToggleComponent },
		{ name:'product-select', component:ProductSelectComponent},
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
		{ name: 'masking', component: InputMaskComponent, wrappers: [ 'form-field' ] },
		{
			name: 'phone',
			extends: 'masking',
			defaultOptions: {
				templateOptions: {
					mask: '(000) 000-0000'
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
			wrappers: [ 'form-field' ],
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
					mask: '00/00/0000'
				},
				validators: {
					invalidDate: (control: FormControl, field: any) => ValidationService.validDate(control, field),
					minorAge: (control: FormControl, field: any) => ValidationService.minorAge(control, field),
					futuredate: (control: FormControl) => ValidationService.fututeDate(control)
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
					futuredate: (control: FormControl) => ValidationService.fututeDate(control)
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
		{ name: 'zipcode', component: ZipcodeComponent, wrappers: [ 'form-field' ] },
		{ name: 'joint-checkbox', component: JointApplicantComponent },
		{ name: 'online-cross-sell', component: DynamicCrossSellComponent },
		{ name: 'dynamic-cross-sell', component: DynamicCrossSellComponent },
		{ name: 'currency', component: CurrencyComponent, wrappers: [ 'form-field' ] },
		{ name: 'read-only', component: ReadOnlyComponent, wrappers: [ 'form-field' ] },
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
		{ name: 'repeat', component: RepeatTypeComponent },
		{ name: 'repeat-screen', component: RepeatScreenComponent },
		{ name: 'disclosure-toggle', component: DisclousreComponent },
		{ name: 'dlscan', component: DriverLicesenceScanComponent }
	],

	validationMessages: [
		{
			name: 'required',
			message: (error, field) => (field['data'] && field['data']['validationMessage'] ? `${field['data']['validationMessage']}` : `${field.templateOptions.label.replace('(MM/DD/YYYY)', '')} is required.`)
		},
		{
			name: 'invalidEmailAddress',
			message: () => 'Invalid Email Address'
		},
		{
			name: 'invalidCharater',
			message: (field) => (field['data'] && field['data']['validationMessage'] ? `${field['data']['validationMessage']}` : 'Invalid Character')
		},
		{
			name: 'invalidCompareFields',
			message: (field) => (field['data'] && field['data']['compareFieldsMessage'] ? `${field['data']['compareFieldsMessage']}` : 'Must not be zero')
		},
		{
			name: 'invalidRegex',
			message: (field) => (field['data'] && field['data']['validationMessage'] ? `${field['data']['validationMessage']}` : 'is not valid')
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
		RepeatTypeComponent,
		RepeatScreenComponent,
		NGXSelectComponent,ToggleComponent,ProductSelectComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		NgxMaskModule.forRoot(),
		FormlyMatFormFieldModule,
		formyconfig,
		MatTableModule,
		MatInputModule,
		MatSelectModule,
		MatCheckboxModule,
		MatButtonModule,
		MatIconModule,
		MatSlideToggleModule,
		SimpleModalModule.forRoot({ container: 'modal-container' }),
		NgxUploaderModule,
		NgSelectModule
	],
	entryComponents: [ SaveForLaterModalComponent, DisclousureModalComponent ],
	exports: [ ReactiveFormsModule, FormsModule, FormlyModule, SaveforLaterDirective, SimpleModalModule ]
})
export class FormlyControls {}
