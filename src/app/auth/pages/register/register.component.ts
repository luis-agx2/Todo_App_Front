import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UTIL_ERRORS_FN } from '../../../shared/data/error-messages.data';
import { CustomValidatorsService } from '../../../shared/services/custom-validators/custom-validators.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  errorFn = UTIL_ERRORS_FN;
  customErrorMessages = {
    invalid_email: () => `Invalid email`,
    no_uppercase_letter: () => `Must contains at least an uppercase letter`,
    no_lowercase_letter: () => `Must contains at least a lowercase letter`,
    no_number: () => `Must contains at least a number`,
    no_symbol: () => `Must contains at least a symbol`,
    no_match_passwords: () => `Passwords must match`
  };

  isLoading: boolean;
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private validatorsService: CustomValidatorsService
  ) {
    this.isLoading = false;

    this.registerForm = this.fb.group(
      {
        nickname: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
        email: ['', [Validators.required, this.validatorsService.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            this.validatorsService.atLeastLetterUpper,
            this.validatorsService.atLeastLetterLower,
            this.validatorsService.atLeastNumber,
            this.validatorsService.atLeastSymbol
          ]
        ],
        confirm_password: ['', [Validators.required]],
        first_name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
        roles: ['', Validators.required],
        terms: [false, [Validators.requiredTrue]]
      },
      {
        validators: [this.validatorsService.matchPasswords('password', 'confirm_password')]
      }
    );
  }

  public getErrorMessage(controlName: string): string {
    const errorKey = Object.keys(this.registerForm.controls[controlName]?.errors || {})[0];
    const errorValue = Object.values(this.registerForm.controls[controlName]?.errors || {})[0];

    return this.errorFn(errorKey, errorValue, this.customErrorMessages);
  }
}
