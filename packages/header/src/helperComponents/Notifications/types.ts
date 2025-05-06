import { NotificationCardProps } from '@snack-uikit/notification';

export type ChipFilter = 'all' | 'unread' | 'system';

export type NotificationItem = Omit<NotificationCardProps, 'onVisible'>;
