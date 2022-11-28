import { render } from 'react-dom';
import { toast, ToastOptions as RtToastOptions } from 'react-toastify';

import { NotificationBig, NotificationBigProps } from './components/NotificationBig';
import { NotificationBigStatus } from './components/NotificationBig/constants';
import { NotificationContainer, NotificationContainerProps } from './components/NotificationContainer';
import { NotificationSmall, NotificationSmallProps } from './components/NotificationSmall';
import { NotificationSmallStatus } from './components/NotificationSmall/constants';
import {
  DEFAULT_AUTO_CLOSE,
  NOTIFICATION_CONTAINER_DEFAULT_PROPS,
  NOTIFICATION_ROOT_ID,
  TWO_SEC_AUTO_CLOSE,
} from './constants';
import { dispatchCustomEvent, NotifyCustomEventKey } from './customEvents';
import {
  BigOptions,
  NotificationEventTrigger,
  NotificationId,
  NotificationOptions,
  NotificationPropsMap,
  NotificationType,
  OpenNotification,
  SmallOptions,
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

function getAutoCloseValue<T extends keyof NotificationPropsMap>(
  notificationProps?: NotificationPropsMap[T],
): number | false {
  if (!notificationProps || !notificationProps.status) {
    return DEFAULT_AUTO_CLOSE;
  }

  switch (notificationProps.status) {
    case NotificationSmall.statuses.Success:
    case NotificationSmall.statuses.Error:
    case NotificationSmall.statuses.Neutral:
      return 'action' in notificationProps ? DEFAULT_AUTO_CLOSE : TWO_SEC_AUTO_CLOSE;
    case NotificationBig.statuses.Info:
    case NotificationBig.statuses.Success:
    case NotificationBig.statuses.Warning:
    case NotificationBig.statuses.WarningCritical:
    case NotificationBig.statuses.Error:
      return DEFAULT_AUTO_CLOSE;

    case NotificationBig.statuses.WarningAlarm:
    case NotificationBig.statuses.ErrorAlarm:
    case NotificationSmall.statuses.Loading:
      return false;

    default:
      return DEFAULT_AUTO_CLOSE;
  }
}

function getNotificationOptions<T extends keyof NotificationPropsMap>({
  type,
  notificationProps,
  notificationOptions,
  containerId,
}: {
  type: T;
  notificationProps?: NotificationPropsMap[T];
  notificationOptions?: NotificationOptions;
  containerId?: NotificationContainerProps['containerId'];
}): RtToastOptions {
  return {
    toastId: notificationOptions?.id,
    onClose: notificationOptions?.onClose,
    autoClose: notificationOptions?.autoClose ?? getAutoCloseValue(notificationProps),
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
    notificationProps,
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

  const options = getNotificationOptions({ type, notificationProps, notificationOptions, containerId });

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

const small = {
  success(options: SmallOptions) {
    dispatchCustomEvent(NotifyCustomEventKey.Open, {
      type: NotificationType.Small,
      notificationOptions: options.id ? { id: options.id } : undefined,
      notificationProps: { ...options, status: NotificationSmallStatus.Success },
    });
  },

  neutral(options: SmallOptions) {
    dispatchCustomEvent(NotifyCustomEventKey.Open, {
      type: NotificationType.Small,
      notificationOptions: options.id ? { id: options.id } : undefined,
      notificationProps: { ...options, status: NotificationSmallStatus.Neutral },
    });
  },

  loading(options: SmallOptions) {
    dispatchCustomEvent(NotifyCustomEventKey.Open, {
      type: NotificationType.Small,
      notificationOptions: options.id ? { id: options.id } : undefined,
      notificationProps: { ...options, status: NotificationSmallStatus.Loading },
    });
  },

  error(options: SmallOptions) {
    dispatchCustomEvent(NotifyCustomEventKey.Open, {
      type: NotificationType.Small,
      notificationOptions: options.id ? { id: options.id } : undefined,
      notificationProps: { ...options, status: NotificationSmallStatus.Error },
    });
  },

  update: {
    success(id: NotificationId, options: SmallOptions) {
      dispatchCustomEvent(NotifyCustomEventKey.Update, {
        id,
        type: NotificationType.Small,
        notificationProps: { ...options, status: NotificationSmallStatus.Success },
      });
    },

    neutral(id: NotificationId, options: SmallOptions) {
      dispatchCustomEvent(NotifyCustomEventKey.Update, {
        id,
        type: NotificationType.Small,
        notificationProps: { ...options, status: NotificationSmallStatus.Neutral },
      });
    },

    loading(id: NotificationId, options: SmallOptions) {
      dispatchCustomEvent(NotifyCustomEventKey.Update, {
        id,
        type: NotificationType.Small,
        notificationProps: { ...options, status: NotificationSmallStatus.Loading },
      });
    },

    error(id: NotificationId, options: SmallOptions) {
      dispatchCustomEvent(NotifyCustomEventKey.Update, {
        id,
        type: NotificationType.Small,
        notificationProps: { ...options, status: NotificationSmallStatus.Error },
      });
    },
  },

  dismiss(id?: NotificationId) {
    dispatchCustomEvent(NotifyCustomEventKey.CloseById, id);
  },
};

const big = {
  success(options: BigOptions) {
    dispatchCustomEvent(NotifyCustomEventKey.Open, {
      type: NotificationType.Big,
      notificationOptions: options.id ? { id: options.id } : undefined,
      notificationProps: { ...options, status: NotificationBigStatus.Success },
    });
  },

  info(options: BigOptions) {
    dispatchCustomEvent(NotifyCustomEventKey.Open, {
      type: NotificationType.Big,
      notificationOptions: options.id ? { id: options.id } : undefined,
      notificationProps: { ...options, status: NotificationBigStatus.Info },
    });
  },

  warning(options: BigOptions) {
    dispatchCustomEvent(NotifyCustomEventKey.Open, {
      type: NotificationType.Big,
      notificationOptions: options.id ? { id: options.id } : undefined,
      notificationProps: { ...options, status: NotificationBigStatus.Warning },
    });
  },

  warningAlarm(options: BigOptions) {
    dispatchCustomEvent(NotifyCustomEventKey.Open, {
      type: NotificationType.Big,
      notificationOptions: options.id ? { id: options.id } : undefined,
      notificationProps: { ...options, status: NotificationBigStatus.WarningAlarm },
    });
  },

  warningCritical(options: BigOptions) {
    dispatchCustomEvent(NotifyCustomEventKey.Open, {
      type: NotificationType.Big,
      notificationOptions: options.id ? { id: options.id } : undefined,
      notificationProps: { ...options, status: NotificationBigStatus.WarningCritical },
    });
  },

  error(options: BigOptions) {
    dispatchCustomEvent(NotifyCustomEventKey.Open, {
      type: NotificationType.Big,
      notificationOptions: options.id ? { id: options.id } : undefined,
      notificationProps: { ...options, status: NotificationBigStatus.Error },
    });
  },

  errorAlarm(options: BigOptions) {
    dispatchCustomEvent(NotifyCustomEventKey.Open, {
      type: NotificationType.Big,
      notificationOptions: options.id ? { id: options.id } : undefined,
      notificationProps: { ...options, status: NotificationBigStatus.ErrorAlarm },
    });
  },

  update: {
    success(id: NotificationId, options: BigOptions) {
      dispatchCustomEvent(NotifyCustomEventKey.Update, {
        id,
        type: NotificationType.Big,
        notificationProps: { ...options, status: NotificationBigStatus.Success },
      });
    },

    info(id: NotificationId, options: BigOptions) {
      dispatchCustomEvent(NotifyCustomEventKey.Update, {
        id,
        type: NotificationType.Big,
        notificationProps: { ...options, status: NotificationBigStatus.Info },
      });
    },

    warning(id: NotificationId, options: BigOptions) {
      dispatchCustomEvent(NotifyCustomEventKey.Update, {
        id,
        type: NotificationType.Big,
        notificationProps: { ...options, status: NotificationBigStatus.Warning },
      });
    },

    warningAlarm(id: NotificationId, options: BigOptions) {
      dispatchCustomEvent(NotifyCustomEventKey.Update, {
        id,
        type: NotificationType.Big,
        notificationProps: { ...options, status: NotificationBigStatus.WarningAlarm },
      });
    },

    warningCritical(id: NotificationId, options: BigOptions) {
      dispatchCustomEvent(NotifyCustomEventKey.Update, {
        id,
        type: NotificationType.Big,
        notificationProps: { ...options, status: NotificationBigStatus.WarningCritical },
      });
    },

    error(id: NotificationId, options: BigOptions) {
      dispatchCustomEvent(NotifyCustomEventKey.Update, {
        id,
        type: NotificationType.Big,
        notificationProps: { ...options, status: NotificationBigStatus.Error },
      });
    },

    errorAlarm(id: NotificationId, options: BigOptions) {
      dispatchCustomEvent(NotifyCustomEventKey.Update, {
        id,
        type: NotificationType.Big,
        notificationProps: { ...options, status: NotificationBigStatus.ErrorAlarm },
      });
    },
  },

  dismiss(id?: NotificationId) {
    dispatchCustomEvent(NotifyCustomEventKey.CloseById, id);
  },
};

export const notification: NotificationEventTrigger = {
  small,
  big,
};
