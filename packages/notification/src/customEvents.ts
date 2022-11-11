import { NotificationBigProps, NotificationContainerProps, NotificationSmallProps } from './components';
import { NotificationOptions, NotificationType } from './types';

type CommonNotificationProps = {
  notificationOptions?: NotificationOptions;
  containerProps?: NotificationContainerProps;
};

type NotificationBig = CommonNotificationProps & {
  type: NotificationType.Big;
  notificationProps: NotificationBigProps;
};

type NotificationSmall = CommonNotificationProps & {
  type: NotificationType.Small;
  notificationProps: NotificationSmallProps;
};

type Notification = NotificationBig | NotificationSmall;

type UpdateNotification = {
  id: string | number;
} & Notification;

type CloseNotifyById = NotificationOptions['id'];

export enum NotifyCustomEventKey {
  // Добавляет уведомление
  Open = 'notify:open',
  // Обновить уведомление
  Update = 'notify:update',
  // Закрыть уведомление по id
  CloseById = 'notify:close_by_id',
}

type NotifyEventDetailsMap = {
  [NotifyCustomEventKey.Open]: Notification;
  [NotifyCustomEventKey.Update]: UpdateNotification;
  [NotifyCustomEventKey.CloseById]: CloseNotifyById;
};

export function dispatchCustomEvent<T extends keyof NotifyEventDetailsMap>(event: T, detail: NotifyEventDetailsMap[T]) {
  window.dispatchEvent(
    new CustomEvent(event, {
      detail,
    }),
  );
}
