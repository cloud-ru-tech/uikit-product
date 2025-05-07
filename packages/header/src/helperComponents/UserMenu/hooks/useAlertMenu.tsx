import { useMemo } from 'react';

import { Alert, AlertProps } from '@snack-uikit/alert';
import { GroupItemProps } from '@snack-uikit/list';

export type UseAlertMenuProps = AlertProps | undefined;

export function useAlertMenu(alertProps: UseAlertMenuProps, divider = true) {
  return useMemo(() => {
    if (!alertProps) return [];

    const groupItem: GroupItemProps = {
      type: 'group',
      items: [
        {
          inactive: true,
          content: <Alert {...alertProps} />,
        },
      ],
      divider,
    };

    return [groupItem];
  }, [alertProps, divider]);
}
