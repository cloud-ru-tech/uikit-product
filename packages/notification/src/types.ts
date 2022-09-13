import { ReactText } from 'react';
import { ToastOptions as RtToastOptions } from 'react-toastify';

import { NotificationBigProps, NotificationContainerProps, NotificationSmallProps } from './components';

export type NotificationOptions = {
  id?: RtToastOptions['toastId'];
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
) => Promise<ReactText | undefined>;

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
