import { useMemo } from 'react';

import { ExitSVG } from '@sbercloud/uikit-product-icons';
import { useLocale } from '@sbercloud/uikit-product-locale';
import { GroupItemProps, ItemProps } from '@snack-uikit/list';

type UseLogoutItemsProps = {
  closeUserMenu(): void;
  onLogout: (() => void) | undefined;
};

export function useLogoutMenu({ onLogout, closeUserMenu }: UseLogoutItemsProps): ItemProps[] {
  const { t } = useLocale('Header');

  return useMemo(() => {
    const groupItem: GroupItemProps = {
      type: 'group',
      items: [],
      divider: true,
      hidden: !onLogout,
    };

    if (onLogout) {
      groupItem.items.push({
        content: {
          option: t('logout'),
        },
        beforeContent: <ExitSVG />,
        onClick: () => {
          onLogout();
          closeUserMenu();
        },
        id: 'header__user-menu__logout',
        'data-test-id': 'header__user-menu__logout',
      });
    }

    return [groupItem];
  }, [closeUserMenu, t, onLogout]);
}
