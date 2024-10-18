import { GlobalTypes, Parameters } from '@storybook/csf';
import { Preview } from '@storybook/react';
import { themes, ThemeVars } from '@storybook/theming';
import cn from 'classnames';
import { FormProvider, useForm } from 'react-hook-form';
import { useDarkMode } from 'storybook-dark-mode';

import {
  PARAM_CAN_ADD_CUSTOM_BRAND_KEY,
  PARAM_COLOR_MAP_KEY,
  PARAM_KEY,
  withBrand,
} from '@sbercloud/ft-storybook-brand-addon';
import { Sprite, SpriteSystemSVG } from '@sbercloud/uikit-product-icons';
import { color, globals, green, greenDark, purple, purpleDark } from '@sbercloud/uikit-product-theme';
import { Alert } from '@snack-uikit/alert';
import { Link } from '@snack-uikit/link';
import { LocaleProvider } from '@snack-uikit/locale';

import { ConfigProvider } from '../packages/utils/src';
import { BADGE, Brand, BRAND_TO_THEME_MAP, DEFAULT_BRAND_COLORS_MAP, DEFAULT_BRAND_MAP, Mode } from './constants';

const LanguageCodeType = ConfigProvider.languages;

const decorators: Preview['decorators'] = [
  withBrand,
  (Story, { globals: { locale, [PARAM_KEY]: brand }, parameters: { badges, snackUiLink } }) => {
    const isDark = useDarkMode();
    const mode = isDark ? Mode.Dark : Mode.Light;
    const normalizedBrand = Object.values(Brand).includes(brand) ? (brand as Brand) : Brand.Cloud;

    const methods = useForm({
      mode: 'onSubmit',
      reValidateMode: 'onSubmit',
      shouldFocusError: true,
      shouldUnregister: true,
    });
    return (
      // Add global styles and theme variables
      <div id='story-root' className={cn(color, globals, green, greenDark, purple, purpleDark)}>
        <Sprite content={SpriteSystemSVG as unknown as string} />
        <FormProvider {...methods}>
          {Array.isArray(badges) && badges.includes(BADGE.DEPRECATED) && (
            <>
              <Alert
                appearance='warning'
                description={
                  <>
                    The package is deprecated.{' '}
                    {snackUiLink ? (
                      <>
                        Go <Link href={snackUiLink} text={'here'} /> to see the new component
                      </>
                    ) : (
                      'See Readme in the Right panel for more info'
                    )}
                  </>
                }
              />
              <br />
            </>
          )}
          <LocaleProvider lang={locale || LanguageCodeType.ruRU}>
            <ConfigProvider
              theme={BRAND_TO_THEME_MAP[normalizedBrand][mode] || ConfigProvider.themes.Purple}
              languageCode={locale || LanguageCodeType.ruRU}
            >
              <Story />
            </ConfigProvider>
          </LocaleProvider>
        </FormProvider>
      </div>
    );
  },
];

const brandInfo: Partial<ThemeVars> = {
  base: 'light',
  brandTitle: 'Cloud.ru',
  brandUrl: '/',
  brandImage: './packages/icons/svgs/color/logos/CloudFullLogoLight.svg',
  brandTarget: '_self',
};

const parameters: Parameters = {
  controls: { expanded: true },
  actions: { argTypesRegex: '^on[A-Z].*' },
  options: {
    storySort: {
      order: ['Welcome', 'Snack Uikit', 'Utils', 'Components', 'Not stable', 'Theme', 'Typography'],
    },
  },
  dependenciesGraph: {
    graphLinks: process.env.DEPENDENCIES_LINKS,
  },
  badgesConfig: {
    [BADGE.PRIVATE]: {
      styles: {
        backgroundColor: '#f2db72',
        borderColor: '#808080',
        color: '#333',
      },
      title: BADGE.PRIVATE,
    },
  },
  darkMode: {
    // Override the default dark theme
    dark: {
      ...themes.dark,
      ...brandInfo,
      base: 'dark',
      appPreviewBg: 'transparent',
      brandImage: './packages/icons/svgs/color/logos/CloudFullLogoDark.svg',
    },
    // Override the default light theme
    light: {
      ...themes.normal,
      ...brandInfo,
      base: 'light',
      brandImage: './packages/icons/svgs/color/logos/CloudFullLogoLight.svg',
    },
  },
};

const globalTypes: GlobalTypes = {
  locale: {
    name: 'Locale',
    description: 'Internationalization locale',
    defaultValue: LanguageCodeType.ruRU,
    toolbar: {
      icon: 'globe',
      items: [
        { value: LanguageCodeType.ruRU, right: '🇷🇺', title: 'Русский' },
        { value: LanguageCodeType.enGB, right: '🇺🇸', title: 'English' },
        { value: LanguageCodeType.cimode, right: '🗝', title: 'CI Mode' },
      ],
    },
  },
  [PARAM_KEY]: {
    name: 'Brand',
    description: 'Changing brands',
    defaultValue: Brand.MLSpace,
  },
  [PARAM_COLOR_MAP_KEY]: {
    name: 'Brand Map with Colors',
    description: 'Map of color for brands list',
    defaultValue: DEFAULT_BRAND_COLORS_MAP,
  },
  [PARAM_CAN_ADD_CUSTOM_BRAND_KEY]: {
    name: 'Can add custom brand',
    defaultValue: false,
  },
  [Brand.Cloud]: {
    name: 'Brand Cloud',
    description: '',
    defaultValue: DEFAULT_BRAND_MAP[Brand.Cloud],
  },
  [Brand.MLSpace]: {
    name: 'Brand MLSpace',
    description: '',
    defaultValue: DEFAULT_BRAND_MAP[Brand.MLSpace],
  },
};

const preview: Preview = {
  decorators,
  parameters,
  globalTypes,
};

// eslint-disable-next-line import/no-default-export
export default preview;
