import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { RENT_CAR_ENDPOINT } from 'src/utils/constants';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('auth');
    if (request.url.endsWith(RENT_CAR_ENDPOINT)) {
      const authReq = request.clone({
        headers: request.headers.set('Authentication', `Bearer: ${token}`),
      });
      return next.handle(authReq);
    }
    return next.handle(request);
  }
}
