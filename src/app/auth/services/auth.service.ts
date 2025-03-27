import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginRequest, LoginResponse } from '../interfaces/login.interface';
import { RegisterRequest } from '../interfaces/register.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.api}/${environment.auth.baseUrl}`;
  }

  login(request: LoginRequest): Observable<LoginResponse> {
    const url = `${this.baseUrl}/${environment.auth.login}`;

    return this.http.post<LoginResponse>(url, request).pipe(
      tap((response) => {
        localStorage.setItem('token', response.jwt);
      })
    );
  }

  register(request: RegisterRequest): Observable<void> {
    const url = `${this.baseUrl}/${environment.auth.register}`;

    return this.http.post<void>(url, request);
  }
}
