import { MouseEvent, useMemo } from 'react';
import { useUncontrolledProp } from 'uncontrollable';

import { NotificationsProps, WithOpenControlNotificationsProps } from '../helperComponents/Notifications';

export function useNotifications(notifications?: NotificationsProps): WithOpenControlNotificationsProps | undefined {
  const [open, onOpenChange] = useUncontrolledProp(notifications?.open, false, notifications?.onOpenChange);

  const items = useMemo(
    () =>
      notifications?.items.map(item => ({
        ...item,
        link: item.link
          ? {
              ...item.link,
              onClick: (event: MouseEvent<HTMLAnchorElement>) => {
                item?.link?.onClick?.(event);
                onOpenChange(false);
              },
            }
          : undefined,
      })) || [],
    [notifications?.items, onOpenChange],
  );

  if (!notifications) {
    return notifications;
  }

  return {
    ...notifications,
    items,
    open,
    onOpenChange,
  };
}
