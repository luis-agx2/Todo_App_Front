import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  private spinnerLoading$ = new BehaviorSubject<boolean>(false);

  constructor(private snackBar: MatSnackBar) {}

  spinnerLoading(): Observable<boolean> {
    return this.spinnerLoading$.asObservable();
  }

  setSpinnerLoading(loading: boolean): void {
    this.spinnerLoading$.next(loading);
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
