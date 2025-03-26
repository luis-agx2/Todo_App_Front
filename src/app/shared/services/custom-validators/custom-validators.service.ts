import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { regex } from '../../data/regex.data';

@Injectable({
  providedIn: 'root'
})
export class CustomValidatorsService {
  email(control: AbstractControl): ValidationErrors | null {
    return !regex.emailPattern.test(control.value) ? { invalid_email: true } : null;
  }

  atLeastLetterUpper(control: AbstractControl): ValidationErrors | null {
    return !regex.upperCase.test(control.value) ? { no_uppercase_letter: true } : null;
  }

  atLeastLetterLower(control: AbstractControl): ValidationErrors | null {
    return !regex.lowerCase.test(control.value) ? { no_lowercase_letter: true } : null;
  }

  atLeastNumber(control: AbstractControl): ValidationErrors | null {
    return !regex.decimal.test(control.value) ? { no_number: true } : null;
  }

  atLeastSymbol(control: AbstractControl): ValidationErrors | null {
    return !regex.symbol.test(control.value) ? { no_symbol: true } : null;
  }

  matchPasswords(controlOne: string, controlTwo: string): ValidatorFn {
    return (form: AbstractControl): ValidationErrors | null => {
      const controlA = form.get(controlOne);
      const controlB = form.get(controlTwo);

      if (controlB?.value !== '' && controlA?.value !== controlB?.value) {
        controlB?.setErrors({ no_match_passwords: true });
      } else if (controlB?.value === '') {
        controlB?.setErrors({ required: true });
      } else {
        controlB?.setErrors(null);
      }

      return null;
    };
  }
}
