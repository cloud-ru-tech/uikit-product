import { BellSVG } from '@sbercloud/uikit-product-icons';
import { ButtonFunction } from '@snack-uikit/button';

import { NotificationsProps } from '../Notifications';

type NotificationsTriggerProps = Pick<NotificationsProps, 'count'> & {
  onClick?(): void;
};

export function NotificationsTrigger({ count, onClick }: NotificationsTriggerProps) {
  return (
    <ButtonFunction
      size='m'
      icon={<BellSVG />}
      data-test-id='header__notification-panel-button'
      onClick={onClick}
      {...(count > 0
        ? {
            counter: {
              value: count,
              variant: count > 9 ? 'count-plus' : 'count',
            },
          }
        : {})}
    />
  );
}
