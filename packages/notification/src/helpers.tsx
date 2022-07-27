import { render } from 'react-dom';
import { ToastOptions as RtToastOptions, toast } from 'react-toastify';

import { NotificationBig, NotificationBigProps } from './components/NotificationBig';
import { NotificationContainer, NotificationContainerProps } from './components/NotificationContainer';
import { NotificationSmall, NotificationSmallProps } from './components/NotificationSmall';
import { DEFAULT_AUTO_CLOSE, NOTIFICATION_CONTAINER_DEFAULT_PROPS, NOTIFICATION_ROOT_ID } from './constants';
import {
  NotificationOptions,
  NotificationPropsMap,
  NotificationType,
  OpenNotification,
  UpdateNotification,
} from './types';

function getNotificationContainer({
  type,
  notificationParent,
  containerProps,
}: {
  type: NotificationType;
  notificationParent: HTMLElement;
  containerProps?: NotificationContainerProps;
}) {
  const containerId = containerProps?.containerId || `notification-container__${type}`;

  const notificationContainerProps = {
    ...NOTIFICATION_CONTAINER_DEFAULT_PROPS[type],
    ...(containerProps || {}),
    containerId,
  };

  const notificationRootId = `${NOTIFICATION_ROOT_ID}__${type}`;

  let rootInDOM = notificationParent.querySelector(`#${notificationRootId}`);

  if (!rootInDOM) {
    rootInDOM = document.createElement('div');
    rootInDOM.id = notificationRootId;
    notificationParent.appendChild(rootInDOM);
  }

  return {
    notificationContainer: rootInDOM,
    notificationContainerProps,
  };
}

function getNotificationOptions<T extends keyof NotificationPropsMap>({
  type,
  notificationOptions,
  containerId,
}: {
  type: T;
  notificationOptions?: NotificationOptions;
  containerId?: NotificationContainerProps['containerId'];
}): RtToastOptions {
  return {
    toastId: notificationOptions?.id,
    onClose: notificationOptions?.onClose,
    autoClose: notificationOptions?.autoClose ?? DEFAULT_AUTO_CLOSE,
    containerId: containerId || `notification-container__${type}`,
  };
}

function getNotificationComponent<T extends keyof NotificationPropsMap>({
  type,
  notificationProps,
}: {
  type: T;
  notificationProps: NotificationPropsMap[T];
}) {
  let notificationComponent =
    type === NotificationType.Small ? (
      <NotificationSmall {...(notificationProps as NotificationSmallProps)} />
    ) : undefined;

  if (type === NotificationType.Big) {
    const notificationBigProps = notificationProps as NotificationBigProps;
    notificationComponent = <NotificationBig {...notificationBigProps} />;
  }

  return notificationComponent;
}

export const openNotification: OpenNotification = ({
  type,
  notificationProps,
  containerProps,
  notificationOptions,
  customNotification,
  notificationParent = document.body,
}) => {
  const { notificationContainer, notificationContainerProps } = getNotificationContainer({
    type,
    notificationParent,
    containerProps,
  });

  let notificationComponent = customNotification;

  const options = getNotificationOptions({
    type,
    notificationOptions,
    containerId: notificationContainerProps.containerId,
  });

  if (!customNotification && notificationProps) {
    notificationComponent = getNotificationComponent({
      type,
      notificationProps,
    });
  }

  return new Promise(resolve => {
    render(<NotificationContainer {...notificationContainerProps} />, notificationContainer, () => {
      setTimeout(() => {
        resolve(toast(notificationComponent, options));
      }, 0);
    });
  });
};

export const updateNotification: UpdateNotification = (
  id,
  { type, notificationProps, notificationOptions, containerId, customNotification },
) => {
  let notificationComponent = customNotification;

  const options = getNotificationOptions({ type, notificationOptions, containerId });

  if (!customNotification && notificationProps) {
    notificationComponent = getNotificationComponent({
      type,
      notificationProps,
    });
  }

  return toast.update(id, {
    ...options,
    render: notificationComponent,
  });
};

export const dismissNotification = toast.dismiss;
export const isNotificationActive = toast.isActive;
