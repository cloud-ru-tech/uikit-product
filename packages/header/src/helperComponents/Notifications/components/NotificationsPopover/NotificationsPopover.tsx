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
  // isOpen destroys NotificationPanelPopoverContent
  // localOpen is used to unsure hooks in Notifications will be called
  const [localOpen, setLocalOpen] = useState<boolean>(false);

  const handleOpenChange = (open: boolean) => {
    notifications.onOpenChange?.(open);
    setLocalOpen(open);

    setTimeout(() => {
      setOpen(open);
    }, 0);
  };

  return (
    <NotificationPanelPopover
      placement='bottom-end'
      trigger='click'
      onOpenChange={handleOpenChange}
      open={isOpen}
      content={<Notifications {...notifications} open={localOpen} className={styles.notifications} />}
    >
      <NotificationsTrigger count={notifications.count} onClick={notifications.onNotifyTriggerClick} />
    </NotificationPanelPopover>
  );
}
