import { Injectable, transition } from "@angular/core";
import { FormsModule, FormGroup, FormControl } from "@angular/forms";
import * as _ from 'underscore';
export class ValidationService {
         public static orgModel: any;

         static getValidatorErrorMessage(code: string) {
           let config = { required: "Required", invalidEmailAddress: "Invalid email address", invalidPassword: "Invalid password. Password must be at least 6 characters long, and contain a number." };
           return config[code];
         }

         static alphabet(control, field) {
           var regExValue = "^[a-zA-Z-_ ,.']*$";
           if (control.value) {
             var regex = new RegExp(regExValue);
             if (!regex.test(control.value)) {
               return false;
             }
           }
           return true;
         }

         static validDate(control: FormControl, field: any) {
           if (control.value) {
             var myDate = control.value.split("/"),
               subDate,
               subMonth = myDate[0] - 1,
               subDay = myDate[1],
               subYear = myDate[2],
               currdate = new Date();
             subDate = new Date(subYear, subMonth, subDay);
             if (isNaN(subDate.getTime()) || control.value.length < 10 || subMonth > 11 || subDay > 31) {
               return false;
             }
             return true;
           }
           return true;
         }

         static minorAge(control: FormControl, field: any) {
           if (control.value) {
             var myDate = control.value.split("/"),
               subDate,
               subMonth = myDate[0] - 1,
               subDay = myDate[1],
               subYear = myDate[2],
               currdate = new Date();
             subDate = new Date(subYear, subMonth, subDay);
             currdate.setFullYear(currdate.getFullYear() - (field.data && field.data.MinAge ? field.data.MinAge : 18));
             var valid = currdate > subDate;
             if (!valid && new Date() > subDate) {
               return false;
             }
           }
           return true;
         }

         static fututeDate(control: FormControl) {
           if (control.value) {
             var myDate = control.value.split("/"),
               subDate,
               subMonth = myDate[0] - 1,
               subDay = myDate[1],
               subYear = myDate[2],
               currdate = new Date();
             subDate = new Date(subYear, subMonth, subDay);
             var valid = currdate > subDate;
             if (!valid) {
               return false;
             }
           }
           return true;
         }

         static SSN(control: FormControl, field) {
           if (control.value) {
             var regExRules: ["^([0-7]\\d{2}|8[0-7]\\d|88[0-9]|89[0-9])([ \\-]?)(\\d{2})\\2(\\d{4})$", "^([X]{5})(\\d{4})$"];
             var invalidSSNs = ["111111111", "222222222", "444444444", "555555555", "777777777", "888888888", "999999999", "123456789", "078051120", "219099999", "987654320", "987654321", "987654322", "987654323", "987654324", "987654325", "987654326", "987654327", "987654328", "987654329"];
             var invalidAreaNumbers = ["333", "XXX"]; //Removed ['000', '333', '666', 'XXX']
             var invalidGroupNumbers = ["00", "XX"];
             var invalidSerialNumbers = ["0000"];
             var testAreaNumbers = ["999", "991", "500"];
             if (control.value.length == 11) {
               var valid = true;
               var value = control.value;
               value = value
                 .replace(/-/g, "")
                 .replace(/_/g, "")
                 .replace(/ /g, "");
               var areaNum = value.substring(0, 3);
               var groupNum = value.substring(3, 5);
               var serialNum = value.substring(5, 9);
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
               if (areaNum.substring(0, 1) === "9" || (areaNum.substring(3, 2) === "0" && groupNum.substring(0, 1) === "0")) {
                 valid = false;
               }
               var re = /^([0-7]\d{2}|8[0-7]\d|88[0-9]|89[0-9])([ \-]?)(\d{2})\2(\d{4})$/;
               var re2 = /^([X]{5})(\d{4})$/;
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
             var invalidPhoneNumbers: ["0000000000"];
             var invalidNPA = ["000"];
             var invalidN = ["0", "1"];
             var value = control.value
               .replace(/-/g, "")
               .replace(/\(/g, "")
               .replace(/ /g, "")
               .replace(/\)/g, "");
             if (10 === value.length) {
               var NPA = value.substring(0, 3);
               var N = value.substring(3, 4);
               var subscriberNum = value.substring(4, 10);
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
             var myDate = control.value.split("/"),
               subDate,
               subMonth = myDate[0] - 1,
               subDay = myDate[1],
               subYear = myDate[2],
               currdate = new Date();
             subDate = new Date(subYear, subMonth, subDay);
             var valid = currdate < subDate;
             if (!valid) {
               return false;
             }
           }
           return true;
         }

         static compareFields(control, field) {
           if (control.value && field.formControl) {
             var inValid = false,
               model = this.orgModel;
             var parts = field.data.fieldToCompare ? field.data.fieldToCompare.split(".") : [];
             var value = control.value;
             if (model && model[parts[0]][parts[1]] && typeof model[parts[0]][parts[1]] !== "undefined") {
               if ("" + model[parts[0]][parts[1]] === "0") {
                 if (typeof value !== "undefined") {
                   if ("" + value === "0") {
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
      }
