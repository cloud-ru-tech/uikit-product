import { ReactNode, useMemo } from 'react';

import { SettingsSVG } from '@sbercloud/uikit-product-icons';
import { Avatar, AvatarProps } from '@snack-uikit/avatar';
import { ItemProps } from '@snack-uikit/list';

import styles from '../styles.module.scss';

export type User = {
  name: string;
  email: string;
};

type UseProfileMenuProps = {
  user: User | undefined;
  indicator: AvatarProps['indicator'] | undefined;
  onProfileManagementClick: undefined | (() => void);
  profileItemWrapRender: undefined | ((item: ReactNode) => ReactNode);
  closeUserMenu(): void;
  hasDivider?: boolean;
};

export function useProfileMenu({
  user,
  indicator,
  profileItemWrapRender,
  onProfileManagementClick,
  closeUserMenu,
  hasDivider,
}: UseProfileMenuProps): ItemProps[] {
  return useMemo(() => {
    if (!user) {
      return [];
    }

    return [
      {
        type: 'group',
        divider: hasDivider,
        items: [
          {
            content: {
              option: user.name,
              description: user.email,
              truncate: {
                description: 1,
              },
            },
            beforeContent: <Avatar size='xs' name={user.name} showTwoSymbols indicator={indicator} />,
            afterContent: (
              <div className={styles.settingIcon}>
                <SettingsSVG />
              </div>
            ),
            itemWrapRender: profileItemWrapRender,
            inactive: !onProfileManagementClick || undefined,
            onClick: () => {
              onProfileManagementClick?.();
              closeUserMenu();
            },
            id: 'header__user-menu__button',
            'data-test-id': 'header__user-menu__button',
            className: styles.userMenuInfoItem,
          },
        ],
      },
    ];
  }, [closeUserMenu, hasDivider, indicator, onProfileManagementClick, profileItemWrapRender, user]);
}
