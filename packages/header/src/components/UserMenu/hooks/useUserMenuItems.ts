import { MouseEvent, useMemo } from 'react';

import { BaseItemProps, GroupItemProps, isBaseItemProps, ListProps } from '@snack-uikit/list';

import { ThemeProps, UserProfileProps } from '../types';
import { useLogoutItem } from './useLogoutItem';
import { useProfileItem } from './useProfileItem';
import { useThemeItem } from './useThemeItem';

type UseMenuItems = {
  profile: UserProfileProps;

  theme?: ThemeProps;

  items?: ListProps['items'];

  settingItems?: BaseItemProps[];

  onLogout?(): void;

  onClose?(): void;

  isMobile?: boolean;
};

const DIVIDER_ITEM: GroupItemProps = {
  type: 'group',
  divider: true,
  items: [],
};

export function useUserMenuItems({
  profile,
  theme,
  onLogout,
  items: itemsProp = [],
  isMobile,
  onClose,
  settingItems = [],
}: UseMenuItems) {
  const profileItem = useProfileItem(profile);
  const themeItem = useThemeItem({ ...(theme || {}), isMobile, onClose });
  const logoutItem = useLogoutItem({ onLogout });

  const items = useMemo(() => {
    let items: ListProps['items'] = [profileItem];

    if (themeItem) {
      items = items.concat([DIVIDER_ITEM, themeItem]);
    }

    items = items.concat(itemsProp);
    items = items.concat(logoutItem);

    if (isMobile && Boolean(settingItems?.length)) {
      items = items.concat([DIVIDER_ITEM, ...settingItems]);
    }

    return items.map(item => {
      if (isBaseItemProps(item) && item.id !== 'header__user-menu__theme-mode') {
        return {
          ...item,
          onClick: (e: MouseEvent<HTMLElement>) => {
            item.onClick?.(e);

            if (!e.metaKey) {
              onClose?.();
            }
          },
        };
      }
      return item;
    });
  }, [isMobile, itemsProp, logoutItem, onClose, profileItem, settingItems, themeItem]);

  return items;
}
