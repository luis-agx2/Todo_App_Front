import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UTIL_ERRORS_FN } from '../../../shared/data/error-messages.data';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  errorFn = UTIL_ERRORS_FN;

  loginForm: FormGroup;
  isLoading: boolean;

  constructor(private fb: FormBuilder) {
    this.isLoading = false;

    this.loginForm = fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  public getErrorMessage(controlName: string): string {
    const errorKey = Object.keys(this.loginForm.controls[controlName]?.errors || {})[0];
    const errorValue = Object.values(this.loginForm.controls[controlName]?.errors || {})[0];

    return this.errorFn(errorKey, errorValue);
  }
}
