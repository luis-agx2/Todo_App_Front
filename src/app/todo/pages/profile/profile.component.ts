import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { UTIL_ERRORS_FN } from '../../../generics/data/error-messages.data';
import { UtilsService } from '../../../generics/services/utils/utils.service';
import { Profile } from '../../interfaces/profile.interface';
import { ProfileService } from '../../services/profile/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  errorFn = UTIL_ERRORS_FN;

  editMode: boolean;
  profileForm: FormGroup;
  profile: Profile | undefined;

  spinnerStatus: Observable<boolean>;

  queryParamsSubscription: Subscription | undefined;

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private profileService: ProfileService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private utilService: UtilsService
  ) {
    this.editMode = false;
    this.spinnerStatus = this.utilService.spinnerLoading();

    this.profileForm = this.fb.group({
      nickname: [{ value: '', disabled: true }],
      email: [{ value: '', disabled: true }],
      first_name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      last_name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      age: ['', [Validators.required, Validators.min(15)]]
    });
  }

  ngOnInit(): void {
    this.queryParamsSubscription = this.activatedRoute.queryParams.subscribe({
      next: (value: Params) => {
        this.editMode = value[`mode`] && value[`mode`] === 'edit';
      }
    });

    this.getProfile();
  }

  ngOnDestroy(): void {
    this.queryParamsSubscription?.unsubscribe();
  }

  submitProfile(): void {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    const { first_name: firstName, last_name: lastName, age } = this.profileForm.getRawValue();

    this.profileService.updateUserDetails({ firstName, lastName, age }).subscribe({
      next: (profile: Profile) => {
        this.profile = profile;
        this.editMode = false;
        this.router.navigate(['/profile']);
      }
    });
  }

  goBack(): void {
    if (this.activatedRoute.snapshot.queryParams[`mode`]) {
      this.editMode = false;
    }

    this.location.back();
  }

  edit(): void {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { mode: 'edit' }
    });
    this.editMode = true;
  }

  getErrorMessage(controlName: string): string {
    const errorKey = Object.keys(this.profileForm.controls[controlName]?.errors || {})[0];
    const errorValue = Object.values(this.profileForm.controls[controlName]?.errors || {})[0];

    return this.errorFn(errorKey, errorValue);
  }

  private getProfile(): void {
    this.profileService.getUserDetails().subscribe({
      next: (profile: Profile) => {
        this.patchValueForm(profile);
        this.profile = profile;
      }
    });
  }

  private patchValueForm(profile: Profile): void {
    const {
      user: { nickname: nickname, email },
      firstName: first_name,
      lastName: last_name,
      age
    } = profile;

    this.profileForm.setValue({
      nickname,
      email,
      first_name,
      last_name,
      age
    });
  }
}
