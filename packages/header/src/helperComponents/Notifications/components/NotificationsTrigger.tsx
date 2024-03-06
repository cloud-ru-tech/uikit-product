import { BellSVG } from '@sbercloud/uikit-product-icons';
import { ButtonFunction } from '@snack-uikit/button';

import { NotificationsProps } from '../Notifications';

type NotificationsTriggerProps = Pick<NotificationsProps, 'items'> & {
  onClick?(): void;
};

export function NotificationsTrigger({ items, onClick }: NotificationsTriggerProps) {
  const numberOfUnreadNotifications = items.filter(card => card.unread).length ?? 0;

  return (
    <ButtonFunction
      size='m'
      icon={<BellSVG />}
      data-test-id='header__notification-panel-button'
      onClick={onClick}
      {...(numberOfUnreadNotifications > 0
        ? {
            counter: {
              value: numberOfUnreadNotifications,
              variant: numberOfUnreadNotifications > 9 ? 'count-plus' : 'count',
            },
          }
        : {})}
    />
  );
}
