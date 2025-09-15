import { HttpInterceptorFn, HttpStatusCode } from '@angular/common/http';
import { inject } from '@angular/core';
import { API_URL } from '../injection-tokens/api-tokens';
import { AuthService } from '../services/auth.service';
import { catchError, of, switchMap, throwError } from 'rxjs';
import { NotificationService } from '../services/notification.service';
import { NotificationType } from '../models/notification-type.enum';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

export const refreshTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const apiUrl = inject(API_URL);
  const authService = inject(AuthService);
  const notificationService = inject(NotificationService);
  const router = inject(Router);
  const location = inject(Location);

  if (!req.url.startsWith(apiUrl))
    return next(req);

  return next(req).pipe(
    catchError((error: any) => {
      if (error.status === HttpStatusCode.Unauthorized || error.status === HttpStatusCode.Forbidden) {
        return authService.refreshJwtBearerToken().pipe(
          switchMap(() => {
            // Token refreshment is successful. Replace header and continue
            const tokenKey = authService.getTokenHeaderKey();
            const tokenValue = authService.getTokenHeaderValue();
            return next(req.clone({
              setHeaders: {
                [tokenKey]: tokenValue
              }
            }));
          }),
          catchError((refreshTokenError: any) => {
            if (refreshTokenError.status === HttpStatusCode.Unauthorized) {
              // Login is needed to access the resource
              notificationService.showNotification({
                type: NotificationType.Error,
                title: $localize`Unauthorized`,
                message: $localize`You need to log in to access the resource.`
              });

              router.navigate(['/login'], {
                queryParams: {
                  returnUrl: router.url
                }
              });

              return of();
            }
            else if (error.status === HttpStatusCode.Forbidden) {
              // Permission is missing. Reroute to the previous page
              notificationService.showNotification({
                type: NotificationType.Error,
                title: $localize`Access Denied`,
                message: $localize`You do not have the permission to access this resource.`
              });

              location.back();

              return of();
            }
            else {
              // Something else happened. Let the caller handle it
              return throwError(() => refreshTokenError);
            }
          })
        );
      }

      return next(req);
    })
  );
};
