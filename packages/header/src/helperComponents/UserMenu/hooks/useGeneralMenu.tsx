import { useMemo } from 'react';

import { ChevronRightSVG, FeaturedSVG, ThemeContrastSVG } from '@sbercloud/uikit-product-icons';
import { useLocale } from '@sbercloud/uikit-product-locale';
import { GroupItemProps, ItemProps } from '@snack-uikit/list';

import { useGetThemeModeOptions } from '../../../hooks';
import { ThemeMode } from '../../../types';

type UseWhatNewMenu = {
  closeUserMenu(): void;
  onWhatsNewClick?(): void;
  onThemeSelectorClick?(): void;
  themeMode?: {
    value: ThemeMode;
    onChange(value: ThemeMode): void;
  };
};

export function useGeneralMenu({
  themeMode,
  onThemeSelectorClick,
  onWhatsNewClick,
  closeUserMenu,
}: UseWhatNewMenu): ItemProps[] {
  const { t } = useLocale('Header');
  const themeModeOptions = useGetThemeModeOptions({ themeMode });

  return useMemo(() => {
    const groupItem: GroupItemProps = {
      type: 'group',
      items: [],
      divider: true,
      hidden: !(themeMode || onWhatsNewClick || onThemeSelectorClick),
    };

    if (themeModeOptions) {
      groupItem.items.push({
        type: 'next-list',
        content: {
          option: t('themeModeLabel'),
        },
        placement: 'left-start',
        beforeContent: <ThemeContrastSVG />,
        'data-test-id': 'header__user-menu__theme-mode',
        items: themeModeOptions,
      });
    }

    if (onThemeSelectorClick) {
      groupItem.items.push({
        content: {
          option: t('themeModeLabel'),
        },
        onClick: onThemeSelectorClick,
        afterContent: <ChevronRightSVG />,
        beforeContent: <ThemeContrastSVG />,
        'data-test-id': 'header__user-menu__theme-mode',
      });
    }

    if (onWhatsNewClick) {
      groupItem.items.push({
        content: {
          option: t('whatsNew'),
        },
        beforeContent: <FeaturedSVG />,
        onClick: () => {
          onWhatsNewClick();
          closeUserMenu();
        },
        id: 'header__user-menu__whats-new',
        'data-test-id': 'header__user-menu__whats-new',
      });
    }

    return [groupItem];
  }, [closeUserMenu, onThemeSelectorClick, onWhatsNewClick, t, themeMode, themeModeOptions]);
}
