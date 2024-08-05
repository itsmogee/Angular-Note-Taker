import {
  HttpHandlerFn,
  HttpRequest,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { catchError, throwError } from 'rxjs';
import { ErrorComponent } from './error/error.component';

export function errorInterceptor(req: HttpRequest<any>, next: HttpHandlerFn) {
  const dialog = inject(MatDialog);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'An unknown error occured';
      if (error.error.message) {
        errorMessage = error.error.message;
      }
      dialog.open(ErrorComponent, { data: { message: errorMessage } });
      return throwError(error);
    }),
  );
}
