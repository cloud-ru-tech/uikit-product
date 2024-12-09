import { useMemo } from 'react';

import { ExitSVG } from '@sbercloud/uikit-product-icons';
import { useLanguage } from '@sbercloud/uikit-product-utils';
import { GroupItemProps, ItemProps } from '@snack-uikit/list';

import { textProvider, Texts } from '../../../helpers';

type UseLogoutItemsProps = {
  closeUserMenu(): void;
  onLogout: (() => void) | undefined;
};

export function useLogoutMenu({ onLogout, closeUserMenu }: UseLogoutItemsProps): ItemProps[] {
  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });

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
          option: textProvider(languageCode, Texts.Logout),
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
  }, [closeUserMenu, languageCode, onLogout]);
}
