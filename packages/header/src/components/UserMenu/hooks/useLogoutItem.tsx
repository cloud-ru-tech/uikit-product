import { useMemo } from 'react';

import { ExitSVG } from '@sbercloud/uikit-product-icons';
import { useLocale } from '@sbercloud/uikit-product-locale';
import { ListProps } from '@snack-uikit/list';

type UseLogoutItemProps = {
  onLogout?(): void;
};

export function useLogoutItem({ onLogout }: UseLogoutItemProps): ListProps['items'] {
  const { t } = useLocale('Header');

  return useMemo(
    () => [
      { type: 'group', divider: true, items: [] },
      {
        content: {
          option: t('logout'),
        },
        beforeContent: <ExitSVG />,
        onClick: onLogout,
        'data-test-id': 'header__user-menu__logout',
      },
    ],
    [onLogout, t],
  );
}
