import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable } from 'rxjs';
import { THEME_OPTIONS } from '../../interfaces/theme.interface';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  private spinnerLoading$ = new BehaviorSubject<boolean>(false);
  private themeValue$ = new BehaviorSubject<THEME_OPTIONS>(THEME_OPTIONS.LIGHT);

  constructor(private snackBar: MatSnackBar) {}

  spinnerLoading(): Observable<boolean> {
    return this.spinnerLoading$.asObservable();
  }

  setSpinnerLoading(loading: boolean): void {
    this.spinnerLoading$.next(loading);
  }

  themeObservable(): Observable<THEME_OPTIONS> {
    return this.themeValue$;
  }

  setThemeValue(theme: THEME_OPTIONS): void {
    this.themeValue$.next(theme);
  }

  openBasicSnackBar(message: string, snackBarConfig?: MatSnackBarConfig): void {
    const config = {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'end',
      ...snackBarConfig
    } as MatSnackBarConfig;
    this.snackBar.open(message, '', config);
  }
}
