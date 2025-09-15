import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';
import { NotificationType } from '../models/notification-type.enum';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const notificationService = inject(NotificationService);
  const router = inject(Router);

  if (authService.isAuthenticated())
    return true;

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

  return false;
};
