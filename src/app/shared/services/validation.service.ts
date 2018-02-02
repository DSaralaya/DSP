import { Injectable, transition } from '@angular/core';
import { FormsModule, FormGroup, FormControl, ValidationErrors } from '@angular/forms';
import * as _ from 'underscore';
import { FieldType, FormlyFieldConfig } from '@ngx-formly/core';

export class ValidationService {
	public static orgModel: any;

	static getValidatorErrorMessage(code: string) {
		const config = { required: 'Required', invalidEmailAddress: 'Invalid email address', invalidPassword: 'Invalid password. Password must be at least 6 characters long, and contain a number.' };
		return config[code];
	}

	static alphabet(control, field) {
		const regExValue = '^[a-zA-Z-_ ,.\']*$';
		if (control.value) {
			const regex = new RegExp(regExValue);
			if (!regex.test(control.value)) {
				return false;
			}
		}
		return true;
	}

	static validDate(control: FormControl, field: any) {
		if (control.value) {
			const myDate = control.value.split('/'),
				subMonth = myDate[0] - 1,
				subDay = myDate[1],
				subYear = myDate[2],
				currdate = new Date();
			const subDate = new Date(subYear, subMonth, subDay);
			if (isNaN(subDate.getTime()) || control.value.length < 10 || subMonth > 11 || subDay > 31) {
				return false;
			}
			return true;
		}
		return true;
	}

	static minorAge(control: FormControl, field: any) {
		if (control.value) {
			const myDate = control.value.split('/'),
				subMonth = myDate[0] - 1,
				subDay = myDate[1],
				subYear = myDate[2],
				currdate = new Date();
			const subDate = new Date(subYear, subMonth, subDay);
			currdate.setFullYear(currdate.getFullYear() - (field.data && field.data.MinAge ? field.data.MinAge : 18));
			const valid = currdate > subDate;
			if (!valid && new Date() > subDate) {
				return false;
			}
		}
		return true;
	}

	static fututeDate(control: FormControl) {
		if (control.value) {
			const myDate = control.value.split('/'),
				subMonth = myDate[0] - 1,
				subDay = myDate[1],
				subYear = myDate[2],
				currdate = new Date();
			const subDate = new Date(subYear, subMonth, subDay);
			const valid = currdate > subDate;
			if (!valid) {
				return false;
			}
		}
		return true;
	}

	static SSN(control: FormControl, field) {
		if (control.value) {
			const regExRules = [ '^([0-7]\\d{2}|8[0-7]\\d|88[0-9]|89[0-9])([ \\-]?)(\\d{2})\\2(\\d{4})$', '^([X]{5})(\\d{4})$' ];
			const invalidSSNs = [ '111111111', '222222222', '444444444', '555555555', '777777777', '888888888', '999999999', '123456789', '078051120', '219099999', '987654320', '987654321', '987654322', '987654323', '987654324', '987654325', '987654326', '987654327', '987654328', '987654329' ];
			const invalidAreaNumbers = [ '333', 'XXX' ];
			const invalidGroupNumbers = [ '00', 'XX' ];
			const invalidSerialNumbers = [ '0000' ];
			const testAreaNumbers = [ '999', '991', '500' ];
			if (control.value.length === 11) {
				let valid = true;
				let value = control.value;
				value = value.replace(/-/g, '').replace(/_/g, '').replace(/ /g, '');
				const areaNum = value.substring(0, 3);
				const groupNum = value.substring(3, 5);
				const serialNum = value.substring(5, 9);
				if (_.indexOf(invalidAreaNumbers, areaNum) !== -1) {
					valid = false;
				}
				if (_.indexOf(invalidGroupNumbers, groupNum) !== -1) {
					valid = false;
				}
				if (_.indexOf(invalidSerialNumbers, serialNum) !== -1) {
					valid = false;
				}
				if (_.indexOf(invalidSSNs, value) !== -1) {
					valid = false;
				}
				if (areaNum.substring(0, 1) === '9' || (areaNum.substring(3, 2) === '0' && groupNum.substring(0, 1) === '0')) {
					valid = false;
				}
				const re = /^([0-7]\d{2}|8[0-7]\d|88[0-9]|89[0-9])([ \-]?)(\d{2})\2(\d{4})$/;
				const re2 = /^([X]{5})(\d{4})$/;
				if (!re.test(value) && !re2.test(value)) {
					if (_.indexOf(testAreaNumbers, areaNum) === -1) {
						valid = false;
					}
				}
				return valid;
			}
		}
		return true;
	}

	static email(control) {
		if (control.value) {
			if (!control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
				return false;
			}
		}
		return true;
	}

	static phone(control) {
		if (control.value) {
			const invalidPhoneNumbers = [ '0000000000' ];
			const invalidNPA = [ '000' ];
			const invalidN = [ '0', '1' ];
			const value = control.value.replace(/-/g, '').replace(/\(/g, '').replace(/ /g, '').replace(/\)/g, '');
			if (10 === value.length) {
				const NPA = value.substring(0, 3);
				const N = value.substring(3, 4);
				const subscriberNum = value.substring(4, 10);
				if (_.indexOf(invalidNPA, NPA) !== -1) {
					return false;
				}
				if (_.indexOf(invalidN, N) !== -1) {
					return false;
				}
				if (_.indexOf(invalidPhoneNumbers, value) !== -1) {
					return false;
				}
			} else {
				return false;
			}
		}
		return true;
	}

	static password(control) {
		if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
			return null;
		} else {
			return { invalidPassword: true };
		}
	}

	static pastDate(control) {
		if (control.value) {
			const myDate = control.value.split('/'),
				subMonth = myDate[0] - 1,
				subDay = myDate[1],
				subYear = myDate[2],
				currdate = new Date();
			const subDate = new Date(subYear, subMonth, subDay);
			const valid = currdate < subDate;
			if (!valid) {
				return false;
			}
		}
		return true;
	}

	static compareFields(control, field) {
		if (control.value && field.formControl) {
			const inValid = false,
				model = this.orgModel;
			const parts = field.data.fieldToCompare ? field.data.fieldToCompare.split('.') : [];
			const value = control.value;
			if (model && model[parts[0]][parts[1]] && typeof model[parts[0]][parts[1]] !== 'undefined') {
				if ('' + model[parts[0]][parts[1]] === '0') {
					if (typeof value !== 'undefined') {
						if ('' + value === '0') {
							return false;
						}
					} else {
						return false;
					}
				}
			}
		}
		return true;
	}

	static regex(control, field) {
		if (control.value && field.data && field.data.regExValue) {
			if (!field.data.regExValue.test(control.value)) {
				return false;
			}
		}
		return true;
	}

	static nopobox(control) {
		const pattern = new RegExp('\\b[P|p]*(OST|ost)*\\.*\\s*[O|o|0]*(ffice|FFICE)*\\.*\\s*[B|b][O|o|0][X|x]\\b');
		if (control.value) {
			if (!pattern.test(control.value)) {
				return false;
			}
		}
		return true;
	}
}
