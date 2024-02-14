import { useState } from 'react';

import { NotificationPanelPopover } from '@snack-uikit/notification';

import { Notifications, NotificationsProps } from '../../Notifications';
import { NotificationsTrigger } from '../NotificationsTrigger';
import styles from './styles.module.scss';

type NotificationsPopoverProps = {
  notifications: NotificationsProps;
};

export function NotificationsPopover({ notifications }: NotificationsPopoverProps) {
  const [isOpen, setOpen] = useState<boolean>(false);

  const handleOpenChange = (open: boolean) => {
    notifications.onOpenChange?.(open);
    setOpen(open);
  };

  return (
    <NotificationPanelPopover
      placement='bottom-end'
      trigger='click'
      onOpenChange={handleOpenChange}
      content={<Notifications {...notifications} open={isOpen} className={styles.notifications} />}
    >
      <NotificationsTrigger items={notifications.items} onClick={notifications.onNotifyTriggerClick} />
    </NotificationPanelPopover>
  );
}
