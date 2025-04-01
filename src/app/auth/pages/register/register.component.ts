import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UTIL_ERRORS_FN } from '../../../generics/data/error-messages.data';
import { RoleResponse } from '../../../generics/interfaces/role.interface';
import { CustomValidatorsService } from '../../../generics/services/custom-validators/custom-validators.service';
import { RolesService } from '../../../generics/services/roles/roles.service';
import { UtilsService } from '../../../generics/services/utils/utils.service';
import { AuthService } from '../../services/auth.service';

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

  spinnerStatus: Observable<boolean>;
  registerForm: FormGroup;

  roles$: Observable<RoleResponse[]>;

  constructor(
    private fb: FormBuilder,
    private validatorsService: CustomValidatorsService,
    private rolesService: RolesService,
    private authService: AuthService,
    private utilService: UtilsService,
    private router: Router
  ) {
    this.spinnerStatus = this.utilService.spinnerLoading();
    this.roles$ = this.getRolesCat();

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

  submitRegister(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const { email, password, nickname, roles, first_name: firstName } = this.registerForm.getRawValue();
    const rolesId = roles.map((role: RoleResponse) => role.id);
    this.authService.register({ email, password, nickname, roles: rolesId, firstName }).subscribe({
      next: () => {
        this.utilService.openBasicSnackBar('User was registered successfully', { panelClass: 'mat-snack-bar-success' });
        this.router.navigate(['auth/login']);
      }
    });
  }

  public getErrorMessage(controlName: string): string {
    const errorKey = Object.keys(this.registerForm.controls[controlName]?.errors || {})[0];
    const errorValue = Object.values(this.registerForm.controls[controlName]?.errors || {})[0];

    return this.errorFn(errorKey, errorValue, this.customErrorMessages);
  }

  private getRolesCat(): Observable<RoleResponse[]> {
    return this.rolesService.getRolesCat();
  }
}
