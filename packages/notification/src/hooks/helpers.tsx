import { MutableRefObject } from 'react';
import { ToastOptions as RtToastOptions } from 'react-toastify';

import { NotificationBig, NotificationBigProps } from '../components/NotificationBig';
import { NotificationContainerProps } from '../components/NotificationContainer';
import { NotificationSmall, NotificationSmallProps } from '../components/NotificationSmall';
import { DEFAULT_AUTO_CLOSE, NOTIFICATION_CONTAINER_DEFAULT_PROPS, NOTIFICATION_ROOT_ID } from './constants';
import { NotificationOptions, NotificationPropsMap, NotificationRoot, NotificationType } from './types';

export function getNotificationContainer({
  type,
  notificationRoot,
  notificationParent,
  containerProps,
}: {
  type: NotificationType;
  notificationRoot: MutableRefObject<NotificationRoot>;
  notificationParent: HTMLElement;
  containerProps?: NotificationContainerProps;
}) {
  const containerId = containerProps?.containerId || `notification-container__${type}`;

  const notificationContainerProps = {
    ...NOTIFICATION_CONTAINER_DEFAULT_PROPS[type],
    ...(containerProps || {}),
    containerId,
  };

  if (!notificationRoot.current) {
    const notificationRootId = `${NOTIFICATION_ROOT_ID}__${type}`;

    const rootInDOM = notificationParent.querySelector(`#${notificationRootId}`);

    if (rootInDOM) {
      notificationRoot.current = rootInDOM;
    } else {
      notificationRoot.current = document.createElement('div');
      notificationRoot.current.id = notificationRootId;
      notificationParent.appendChild(notificationRoot.current);
    }
  }

  return {
    notificationContainer: notificationRoot.current,
    notificationContainerProps,
  };
}

export const getNotificationOptions = <T extends keyof NotificationPropsMap>({
  type,
  notificationOptions,
  containerId,
  hasActions,
}: {
  type: T;
  notificationOptions?: NotificationOptions;
  containerId?: NotificationContainerProps['containerId'];
  hasActions?: boolean;
}) => {
  const options: RtToastOptions = {
    toastId: notificationOptions?.id,
    onClose: notificationOptions?.onClose,
    autoClose: hasActions ? false : notificationOptions?.autoClose ?? DEFAULT_AUTO_CLOSE,
    containerId: containerId || `notification-container__${type}`,
  };

  return options;
};

export const getNotificationComponent = <T extends keyof NotificationPropsMap>({
  type,
  notificationProps,
  notificationOptions,
}: {
  type: T;
  notificationProps: NotificationPropsMap[T];
  notificationOptions?: NotificationOptions;
}) => {
  let notificationComponent =
    type === NotificationType.Small ? (
      <NotificationSmall {...(notificationProps as NotificationSmallProps)} />
    ) : undefined;

  if (type === NotificationType.Big) {
    const notificationBigProps = notificationProps as NotificationBigProps;
    notificationComponent = <NotificationBig {...notificationBigProps} />;
  }

  return notificationComponent;
};
