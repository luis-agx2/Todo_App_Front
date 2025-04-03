import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ADD_TOKEN } from './context-jwt-interceptor';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.context.get(ADD_TOKEN)) {
      request = this.addHeaders(request);
    }

    return next.handle(request);
  }

  addHeaders(request: HttpRequest<unknown>): HttpRequest<unknown> {
    const token = localStorage.getItem('token');

    if (token) {
      return request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return request;
  }
}
