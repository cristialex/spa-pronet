import { inject, Injectable } from '@angular/core';
import * as http from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
//angular material
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ApplicationInterceptor implements http.HttpInterceptor {
  private _snackBar = inject(MatSnackBar);

  intercept(
    request: http.HttpRequest<unknown>,
    next: http.HttpHandler
  ): Observable<http.HttpEvent<unknown>> {
    /*
        Adding authorication token - not needed for this example
        request = request.clone({
            setHeaders: {
            Authorization: `Bearer ....`,
            },
        });
    */

    return next.handle(request).pipe(
      catchError((error: http.HttpErrorResponse) => {
        //Additional error messages could be added here.
        this._snackBar.open(
          'Something went wrong. Please try again later.',
          'X',
          {
            horizontalPosition: 'right',
            verticalPosition: 'top',
            duration: 2000,
          }
        );
        return throwError(() => error);
      })
    );
  }
}
