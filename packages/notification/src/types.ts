import { Id, ToastOptions as RtToastOptions } from 'react-toastify';

import { NotificationBigProps, NotificationContainerProps, NotificationSmallProps } from './components';

export type NotificationId = Id;
type PromisedId = Promise<NotificationId>;

export type NotificationOptions = {
  id?: NotificationId;
  autoClose?: RtToastOptions['autoClose'];
  onClose?: RtToastOptions['onClose'];
};

export enum NotificationType {
  Big = 'Big',
  Small = 'Small',
}

export type NotificationPropsMap = {
  [NotificationType.Small]: NotificationSmallProps;
  [NotificationType.Big]: NotificationBigProps;
};

type OpenNotificationProps<T extends keyof NotificationPropsMap> = {
  type: T;
  notificationProps?: NotificationPropsMap[T];
  containerProps?: NotificationContainerProps;
  notificationOptions?: NotificationOptions;
  customNotification?: JSX.Element;
  notificationParent?: HTMLDivElement;
};

type DefaultOrCustomNotification<T extends keyof NotificationPropsMap> =
  | {
      notificationProps: NotificationPropsMap[T];
    }
  | {
      customNotification: JSX.Element;
    };

export type OpenNotification = <T extends keyof NotificationPropsMap>(
  props: DefaultOrCustomNotification<T> & OpenNotificationProps<T>,
) => PromisedId;

export type UpdateNotification = <T extends keyof NotificationPropsMap>(
  id: string | number,
  props: {
    type: T;
    notificationProps?: NotificationPropsMap[T];
    notificationOptions?: NotificationOptions;
    containerId?: NotificationContainerProps['containerId'];
    customNotification?: JSX.Element;
  },
) => void;

export type SmallOptions = Omit<NotificationSmallProps, 'status'> & Pick<NotificationOptions, 'id'>;
export type BigOptions = Omit<NotificationBigProps, 'status'> & Pick<NotificationOptions, 'id'>;

export type NotificationEventTrigger = {
  small: {
    success(options: SmallOptions): void;
    neutral(options: SmallOptions): void;
    loading(options: SmallOptions): void;
    error(options: SmallOptions): void;
    update: {
      success(id: NotificationId, options: SmallOptions): void;
      neutral(id: NotificationId, options: SmallOptions): void;
      loading(id: NotificationId, options: SmallOptions): void;
      error(id: NotificationId, options: SmallOptions): void;
    };
    dismiss(id?: NotificationId): void;
  };
  big: {
    success(options: BigOptions): void;
    info(options: BigOptions): void;
    warning(options: BigOptions): void;
    warningAlarm(options: BigOptions): void;
    warningCritical(options: BigOptions): void;
    error(options: BigOptions): void;
    errorAlarm(options: BigOptions): void;
    update: {
      success(id: NotificationId, options: BigOptions): void;
      info(id: NotificationId, options: BigOptions): void;
      warning(id: NotificationId, options: BigOptions): void;
      warningAlarm(id: NotificationId, options: BigOptions): void;
      warningCritical(id: NotificationId, options: BigOptions): void;
      error(id: NotificationId, options: BigOptions): void;
      errorAlarm(id: NotificationId, options: BigOptions): void;
    };
    dismiss(id?: NotificationId): void;
  };
};
