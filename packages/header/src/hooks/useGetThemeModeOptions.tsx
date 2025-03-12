import { useMemo } from 'react';

import { DaySVG, LaptopPhoneSVG, NightSVG } from '@sbercloud/uikit-product-icons';
import { useLocale } from '@sbercloud/uikit-product-locale';

import { UserMenuProps } from '../helperComponents';
import { THEME_MODE } from '../types';

type UseGetThemeModeOptionsProps = {
  themeMode?: Required<UserMenuProps>['themeMode'];
};

export function useGetThemeModeOptions({ themeMode }: UseGetThemeModeOptionsProps) {
  const { t } = useLocale('Header');

  return useMemo(() => {
    if (!themeMode) {
      return undefined;
    }

    const { value, onChange } = themeMode;

    return [
      {
        beforeContent: <DaySVG />,
        content: {
          option: t('themeModeLight'),
        },
        onClick: () => {
          onChange(THEME_MODE.Light);
        },
        checked: value === THEME_MODE.Light,
        'data-test-id': 'header__user-menu__theme-mode__light-option',
      },
      {
        beforeContent: <NightSVG />,
        content: {
          option: t('themeModeDark'),
        },
        checked: value === THEME_MODE.Dark,
        onClick: () => {
          onChange(THEME_MODE.Dark);
        },
        'data-test-id': 'header__user-menu__theme-mode__dark-option',
      },
      {
        beforeContent: <LaptopPhoneSVG />,
        content: {
          option: t('themeModeSystem'),
        },
        checked: value === THEME_MODE.System,
        onClick: () => {
          onChange(THEME_MODE.System);
        },
        'data-test-id': 'header__user-menu__theme-mode__system-option',
      },
    ];
  }, [t, themeMode]);
}
