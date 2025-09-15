import { NotificationPosition } from "./notification-position.enum"
import { NotificationType } from "./notification-type.enum"

export interface NotificationOptions {
  type: NotificationType,
  title: string,
  message: string,
  position: NotificationPosition,
  timeOut: {
    enabled: boolean,
    milliseconds: number
  }
}