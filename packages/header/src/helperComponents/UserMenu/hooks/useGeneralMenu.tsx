import { useMemo } from 'react';

import { ChevronRightSVG, FeaturedSVG, ThemeContrastSVG } from '@sbercloud/uikit-product-icons';
import { useLanguage } from '@sbercloud/uikit-product-utils';
import { GroupItemProps, ItemProps } from '@snack-uikit/list';

import { getThemeModeOptions, textProvider, Texts } from '../../../helpers';
import { ThemeMode } from '../../../types';

type UseWhatNewMenu = {
  closeUserMenu(): void;
  onWhatsNewClick: (() => void) | undefined;
  onThemeSelectorClick?: () => void;
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
  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });

  return useMemo(() => {
    const groupItem: GroupItemProps = {
      type: 'group',
      items: [],
      divider: true,
      hidden: !(themeMode || onWhatsNewClick || onThemeSelectorClick),
    };

    if (themeMode) {
      groupItem.items.push({
        type: 'next-list',
        content: {
          option: textProvider(languageCode, Texts.ThemeModeLabel),
        },
        placement: 'left-start',
        beforeContent: <ThemeContrastSVG />,
        'data-test-id': 'header__user-menu__theme-mode',
        items: getThemeModeOptions({ themeMode, languageCode }),
      });
    }

    if (onThemeSelectorClick) {
      groupItem.items.push({
        content: {
          option: textProvider(languageCode, Texts.ThemeModeLabel),
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
          option: textProvider(languageCode, Texts.WhatsNew),
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
  }, [closeUserMenu, languageCode, onThemeSelectorClick, onWhatsNewClick, themeMode]);
}
