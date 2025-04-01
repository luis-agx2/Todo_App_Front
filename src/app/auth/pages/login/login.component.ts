import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { UTIL_ERRORS_FN } from '../../../generics/data/error-messages.data';
import { UtilsService } from '../../../generics/services/utils/utils.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  errorFn = UTIL_ERRORS_FN;

  loginForm: FormGroup;
  spinnerStatus: Observable<boolean>;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private utilsService: UtilsService
  ) {
    this.spinnerStatus = this.utilsService.spinnerLoading();

    this.loginForm = fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  submitLogin(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.loginForm.getRawValue();
    this.authService.login({ email, password }).subscribe({
      next: (response) => {
        console.log(response);
      }
    });
  }

  public getErrorMessage(controlName: string): string {
    const errorKey = Object.keys(this.loginForm.controls[controlName]?.errors || {})[0];
    const errorValue = Object.values(this.loginForm.controls[controlName]?.errors || {})[0];

    return this.errorFn(errorKey, errorValue);
  }
}
