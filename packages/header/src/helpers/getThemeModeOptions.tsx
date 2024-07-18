import { DaySVG, LaptopPhoneSVG, NightSVG } from '@sbercloud/uikit-product-icons';
import { LanguageCodeType } from '@sbercloud/uikit-product-utils';
import { PromoTag } from '@snack-uikit/promo-tag';

import { UserMenuProps } from '../helperComponents';
import { THEME_MODE } from '../types';
import { textProvider, Texts } from './textsProvider';

type GetThemeModeOptions = {
  themeMode: Required<UserMenuProps>['themeMode'];
  languageCode: LanguageCodeType;
};

export function getThemeModeOptions({ themeMode, languageCode }: GetThemeModeOptions) {
  const { value, onChange } = themeMode;

  return [
    {
      beforeContent: <DaySVG />,
      content: {
        option: textProvider(languageCode, Texts.ThemeModeLight),
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
        option: textProvider(languageCode, Texts.ThemeModeDark),
      },
      checked: value === THEME_MODE.Dark,
      onClick: () => {
        onChange(THEME_MODE.Dark);
      },
      afterContent: <PromoTag text='beta' appearance='blue' />,
      'data-test-id': 'header__user-menu__theme-mode__dark-option',
    },
    {
      beforeContent: <LaptopPhoneSVG />,
      content: {
        option: textProvider(languageCode, Texts.ThemeModeSystem),
      },
      checked: value === THEME_MODE.System,
      onClick: () => {
        onChange(THEME_MODE.System);
      },
      afterContent: <PromoTag text='beta' appearance='blue' />,
      'data-test-id': 'header__user-menu__theme-mode__system-option',
    },
  ];
}
