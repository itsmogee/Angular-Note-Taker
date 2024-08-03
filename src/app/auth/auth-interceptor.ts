import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export function authInterceptor(req: HttpRequest<any>, next: HttpHandlerFn) {
  const authToken = inject(AuthService).getToken();
  const authRequest = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${authToken}`),
  });
  return next(authRequest);
}
