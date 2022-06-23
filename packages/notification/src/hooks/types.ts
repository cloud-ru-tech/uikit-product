import { ReactText } from 'react';
import { ToastOptions as RtToastOptions } from 'react-toastify';

import { NotificationBigProps, NotificationContainerProps, NotificationSmallProps } from '../components';

export type NotificationRoot = HTMLDivElement | Element | undefined;

export type NotificationOptions = {
  id?: RtToastOptions['toastId'];
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

export type OpenNotification = <T extends keyof NotificationPropsMap>({
  type,
  notificationProps,
  containerProps,
  notificationOptions,
}: {
  type: T;
  notificationProps: NotificationPropsMap[T];
  containerProps?: NotificationContainerProps;
  notificationOptions?: NotificationOptions;
}) => Promise<ReactText | undefined>;

export type UpdateNotification = <T extends keyof NotificationPropsMap>(
  id: string | number,
  {
    type,
    notificationProps,
    notificationOptions,
    containerId,
  }: {
    type: T;
    notificationProps: NotificationPropsMap[T];
    notificationOptions?: NotificationOptions;
    containerId?: NotificationContainerProps['containerId'];
  },
) => void;
