import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'An unknown error occurred';

      if (error.error instanceof ErrorEvent) {
        // Client-side error
        errorMessage = `Error: ${error.error.message}`;
      } else {
        // Server-side error
        if (error.error && error.error.detail) {
          errorMessage = error.error.detail;
        } else if (error.error && error.error.title) {
          errorMessage = error.error.title;
        } else {
          errorMessage = `Error Code: ${error.status}: ${error.message}`;
        }
      }
      
      return throwError(() => new Error(errorMessage));
    })
  );
};
