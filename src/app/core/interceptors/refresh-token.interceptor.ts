import { HttpInterceptorFn, HttpStatusCode } from '@angular/common/http';
import { inject } from '@angular/core';
import { API_URL } from '../injection-tokens/api-tokens';
import { AuthService } from '../services/auth.service';
import { catchError, switchMap, throwError } from 'rxjs';

export const refreshTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const apiUrl = inject(API_URL);
  const authService = inject(AuthService);

  if (req.url.startsWith(apiUrl))
    return next(req);

  return next(req).pipe(
    catchError((error: any) => {
      if (error.status === HttpStatusCode.Unauthorized || error.status === HttpStatusCode.Forbidden) {
        return authService.refreshJwtBearerToken().pipe(
          switchMap(() => {
            const tokenKey = authService.getTokenHeaderKey();
            const tokenValue = authService.getTokenHeaderValue();
            return next(req.clone({
              setHeaders: {
                [tokenKey]: tokenValue
              }
            }));
          }),
          catchError((refreshTokenError: any) => {
            return throwError(() => error);
          })
        );
      }

      return next(req);
    })
  );
};
