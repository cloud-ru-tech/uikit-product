import { useMemo } from 'react';

import { Alert, AlertProps } from '@snack-uikit/alert';
import { GroupItemProps } from '@snack-uikit/list';

export type UseAlertMenuProps = AlertProps | undefined;

export function useAlertMenu(alertProps: UseAlertMenuProps) {
  return useMemo(() => {
    const groupItem: GroupItemProps = {
      type: 'group',
      items: [],
      divider: true,
      hidden: !alertProps,
    };

    if (alertProps) {
      groupItem.items.push({
        inactive: true,
        content: <Alert {...alertProps} />,
      });
    }
    return [groupItem];
  }, [alertProps]);
}
