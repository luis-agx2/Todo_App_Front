import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginRequest, LoginResponse } from '../interfaces/login.interface';
import { RegisterRequest } from '../interfaces/register.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string;
  private jwtHelper: JwtHelperService;

  constructor(private http: HttpClient) {
    this.jwtHelper = new JwtHelperService();
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

  get token(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return this.jwtHelper.isTokenExpired(this.token);
  }

  get roles(): string[] {
    if (!this.token) {
      return [];
    }

    const decodedToken = this.jwtHelper.decodeToken(this.token);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return decodedToken?.roles?.map((role: any) => role.authority);
  }

  get username(): string {
    if (!this.token) {
      return 'Username';
    }

    const decodedToken = this.jwtHelper.decodeToken(this.token);
    return decodedToken?.email ?? 'Username';
  }

  hasAnyRole(allowedRoles: string[]): boolean {
    return allowedRoles.some((allowRole) => {
      return this.roles.some((role) => allowRole.toLocaleUpperCase() === role.toUpperCase());
    });
  }
}
