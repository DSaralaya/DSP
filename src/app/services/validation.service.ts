import { Injectable } from "@angular/core";
import { FormsModule, FormGroup, FormControl } from "@angular/forms";

export class ValidationService {
  static getValidatorErrorMessage(code: string) {
    let config = {
      required: "Required",
      invalidEmailAddress: "Invalid email address",
      invalidPassword:
        "Invalid password. Password must be at least 6 characters long, and contain a number."
    };
    return config[code];
  }

  static alphabetValidator(control, field) {
    var regExValue = "^[a-zA-Z-_ ,.']*$";
    if (control.value) {
      var regex = new RegExp(regExValue);
      if (!regex.test(control.value)) {
        return false;
      }
    }
    return true;
  }

  static validDateValidator(control: FormControl, field: any) {
    if (control.value) {
      var myDate = control.value.split("/"), subDate, subMonth = myDate[0] - 1, subDay = myDate[1],
        subYear = myDate[2],currdate = new Date();
      subDate = new Date(subYear, subMonth, subDay);
      if ( isNaN(subDate.getTime()) || control.value.length < 10 ||subMonth > 11 || subDay > 31 ) {
        return false;
      }
    }
    return true;
  }

  static minorAgeValidation(control: FormControl, field: any) {
    if (control.value) {
      var myDate = control.value.split("/"),subDate, subMonth = myDate[0] - 1,subDay = myDate[1],
      subYear = myDate[2],currdate = new Date();
      subDate = new Date(subYear, subMonth, subDay);
      currdate.setFullYear( currdate.getFullYear() -(field.data && field.data.MinAge ? field.data.MinAge : 18) );
      var valid = currdate > subDate;
      if (!valid && new Date() > subDate) {
        return false;
      }
    }
    return true;
  }

  static fututeDateValidation(control: FormControl) {
    if (control.value) {
      var myDate = control.value.split("/"),subDate,subMonth = myDate[0] - 1,
      subDay = myDate[1], subYear = myDate[2],currdate = new Date();
      subDate = new Date(subYear, subMonth, subDay);
      var valid = currdate > subDate;
      if (!valid) {
        return false;
      }
    }
    return true;
  }

  static emailValidator(form) {
    return function innerFunction(control) {
      if (control.value && control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
        return null;
      } else {
        return {
          invalidEmailAddress: true
        };
      }
    };
  }

  static confirmPassword(form: FormGroup, field) {
    let fieldChanges = false;
    return function innerFunction(control) {
      if (!fieldChanges) {
        form.get(field).valueChanges.subscribe(() => {
          control.updateValueAndValidity();
        });
        fieldChanges = true;
      }
      if (control.value === form.get(field).value) {
        return null;
      } else {
        return {
          not_matching: true
        };
      }
    };
  }

  static passwordValidator(control) {
    if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
      return null;
    } else {
      return {
        invalidPassword: true
      };
    }
  }
}
