import { Injectable } from '@angular/core';
import { ActiveToast, ToastrService } from 'ngx-toastr';
import { NotificationOptions } from '../models/notification-options.model';
import { NotificationPosition } from '../models/notification-position.enum';
import { NotificationType } from '../models/notification-type.enum';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr: ToastrService) { }

  showNotification(options: Partial<NotificationOptions>): ActiveToast<any> {
    let type = options.type;
    if (type == undefined) {
      type = NotificationType.Info;
    }

    let position = options.position;
    if (position == undefined) {
      position = NotificationPosition.BottomRight;
    }

    return this.toastr[type](options.message, options.title, {
      positionClass: position,
      disableTimeOut: options.timeOut?.enabled != undefined ? !options.timeOut.enabled : false,
      timeOut: options.timeOut?.milliseconds ?? 5000,
      tapToDismiss: true,
      closeButton: true,
      newestOnTop: this.isAtTop(position)
    });
  }

  closeNotification(nofitication: ActiveToast<any>): void {
    this.toastr.clear(nofitication.toastId);
  }

  closeAllNotifications(): void {
    this.toastr.clear();
  }

  private isAtTop(position: NotificationPosition): boolean {
    return position == NotificationPosition.TopCenter ||
      position == NotificationPosition.TopFullWidth ||
      position == NotificationPosition.TopLeft || 
      position == NotificationPosition.TopRight;
  }
}
