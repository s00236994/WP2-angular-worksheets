import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export function friendlyMessage(error: HttpErrorResponse): string {
  switch (error.status) {
    case 0:
      return 'Cannot reach the server. Check that the API is running.';
    case 400:
      return 'Some of the data was not valid.';
    case 401:
      return 'Please log in to continue.';
    case 403:
      return 'You are not allowed to do that.';
    case 404:
      return 'The item you asked for could not be found.';
    default:
      return 'Something went wrong on the server. Please try again later.';
  }
}

export const errorInterceptor: HttpInterceptorFn = (req, next) =>
  next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      console.error(`HTTP ${error.status} ${req.method} ${req.url}`, error);
      return throwError(() => new Error(friendlyMessage(error)));
    }),
  );
