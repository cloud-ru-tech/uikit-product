import { useState } from 'react';

import { NotificationPanelPopover } from '@snack-uikit/notification';

import { Notifications, WithOpenControlNotificationsProps } from '../../Notifications';
import { NotificationsTrigger } from '../NotificationsTrigger';
import styles from './styles.module.scss';

type NotificationsPopoverProps = {
  notifications: WithOpenControlNotificationsProps;
};

export function NotificationsPopover({ notifications }: NotificationsPopoverProps) {
  // isOpen destroys NotificationPanelPopoverContent
  // localOpen is used to unsure hooks in Notifications will be called
  const [localOpen, setLocalOpen] = useState<boolean>(notifications.open);

  const handleOpenChange = (open: boolean) => {
    setLocalOpen(open);

    setTimeout(() => {
      notifications.onOpenChange?.(open);
    }, 0);
  };

  return (
    <NotificationPanelPopover
      placement='bottom-end'
      trigger='click'
      onOpenChange={handleOpenChange}
      open={notifications.open}
      data-test-id='header__notifications'
      content={<Notifications {...notifications} open={localOpen} className={styles.notifications} />}
      closeOnPopstate
    >
      <NotificationsTrigger count={notifications.count} onClick={notifications.onNotifyTriggerClick} />
    </NotificationPanelPopover>
  );
}
