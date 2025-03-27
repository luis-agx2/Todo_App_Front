import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { UtilsService } from '../../services/utils/utils.service';
import { ADD_SPINNER } from './context-loader-interceptor';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  private count = 0;

  constructor(private utilsService: UtilsService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const addSpinner = request.context.get(ADD_SPINNER);

    if (this.count === 0 && addSpinner) {
      this.utilsService.setSpinnerLoading(true);
    }

    if (addSpinner) {
      this.count++;
    }

    return next.handle(request).pipe(
      finalize(() => {
        if (addSpinner) {
          this.count--;
        }

        if (this.count === 0) {
          this.utilsService.setSpinnerLoading(false);
        }
      })
    );
  }
}
