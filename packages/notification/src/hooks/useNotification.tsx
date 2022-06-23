import { useEffect, useRef } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { toast as RtToast } from 'react-toastify';

import { NotificationContainer } from '../components/NotificationContainer';
import { NotificationStatuses } from './constants';
import { getNotificationComponent, getNotificationContainer } from './helpers';
import { NotificationType, OpenNotification, UpdateNotification } from './types';

const notificationParent = document.body;

export function useNotification() {
  const notificationRoot = useRef<HTMLDivElement | Element>();

  useEffect(
    () => () => {
      if (notificationRoot.current) {
        unmountComponentAtNode(notificationRoot.current);
        notificationParent.removeChild(notificationRoot.current);
        notificationRoot.current = undefined;
      }
    },
    [],
  );

  const openNotification: OpenNotification = ({ type, notificationProps, containerProps, notificationOptions }) => {
    const { notificationContainer, notificationContainerProps } = getNotificationContainer({
      type,
      notificationParent: notificationParent,
      notificationRoot: notificationRoot,
      containerProps,
    });

    const { notificationComponent, options } = getNotificationComponent({
      type,
      notificationProps,
      notificationOptions,
      containerId: notificationContainerProps.containerId,
    });

    return new Promise(resolve => {
      render(<NotificationContainer {...notificationContainerProps} />, notificationContainer, () => {
        setTimeout(() => {
          resolve(RtToast(notificationComponent, options));
        }, 0);
      });
    });
  };

  const updateNotification: UpdateNotification = (
    id,
    { type, notificationProps, notificationOptions, containerId },
  ) => {
    const { notificationComponent, options } = getNotificationComponent({
      type,
      notificationProps,
      notificationOptions,
      containerId,
    });

    return RtToast.update(id, {
      ...options,
      render: notificationComponent,
    });
  };

  return {
    openNotification,
    updateNotification,
    dismissNotification: RtToast.dismiss,
    isNotificationActive: RtToast.isActive,
    types: NotificationType,
    statuses: NotificationStatuses,
  };
}

useNotification.types = NotificationType;
useNotification.statuses = NotificationStatuses;
