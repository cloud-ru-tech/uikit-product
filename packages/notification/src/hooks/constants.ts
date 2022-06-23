import { NotificationBig } from '../components/NotificationBig';
import { NotificationContainer, NotificationContainerProps } from '../components/NotificationContainer';
import { NotificationSmall } from '../components/NotificationSmall';
import { NotificationType } from './types';

export const NotificationStatuses = {
  [NotificationType.Big]: NotificationBig.statuses,
  [NotificationType.Small]: NotificationSmall.statuses,
};

export const NOTIFICATION_CONTAINER_DEFAULT_PROPS: Record<NotificationType, NotificationContainerProps> = {
  [NotificationType.Big]: {
    limit: 5,
    position: NotificationContainer.position.BOTTOM_RIGHT,
  },
  [NotificationType.Small]: {
    limit: 1,
    position: NotificationContainer.position.BOTTOM_CENTER,
  },
};

export const DEFAULT_AUTO_CLOSE = 5000;

export const NOTIFICATION_ROOT_ID = 'notification-root';
