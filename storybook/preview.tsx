import { StoryFn } from '@storybook/react';
import { themes, ThemeVars } from '@storybook/theming';
import { DecoratorFunction, GlobalTypes, Parameters } from '@storybook/types';
import { FormProvider, useForm } from 'react-hook-form';
import { withDesign } from 'storybook-addon-designs';
import { useDarkMode } from 'storybook-dark-mode';

import { PARAM_CAN_ADD_CUSTOM_BRAND_KEY, PARAM_COLOR_MAP_KEY, PARAM_KEY } from '@sbercloud/ft-storybook-brand-addon';
import { Alert } from '@sbercloud/uikit-product-alert';
import { Link } from '@sbercloud/uikit-product-link';

import { ConfigProvider } from '../packages/utils/src';
import { BADGE, Brand, BRAND_TO_THEME_MAP, DEFAULT_BRAND_COLORS_MAP, DEFAULT_BRAND_MAP, Mode } from './constants';

const LanguageCodeType = ConfigProvider.languages;

const decorators: DecoratorFunction[] = [
  withDesign,
  (Story: StoryFn, { globals: { locale, [PARAM_KEY]: brand }, parameters: { badges, snackUiLink } }) => {
    const isDark = useDarkMode();
    const mode = isDark ? Mode.Dark : Mode.Light;
    const normalizedBrand = Object.values(Brand).includes(brand) ? brand : Brand.Cloud;

    const methods = useForm({
      mode: 'onSubmit',
      reValidateMode: 'onSubmit',
      shouldFocusError: true,
      shouldUnregister: true,
    });
    return (
      // Add global styles and theme variables
      <div id='story-root'>
        <FormProvider {...methods}>
          {Array.isArray(badges) && badges.includes(BADGE.DEPRECATED) && (
            <>
              <Alert
                type={Alert.types.Warning}
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
                variant={Alert.variants.Accent}
              />
              <br />
            </>
          )}
          <ConfigProvider
            theme={BRAND_TO_THEME_MAP[normalizedBrand][mode] || ConfigProvider.themes.Purple}
            languageCode={locale || LanguageCodeType.ruRU}
          >
            <Story />
          </ConfigProvider>
        </FormProvider>
      </div>
    );
  },
];

const brandInfo: ThemeVars = {
  base: 'light',
  brandTitle: 'Cloud.ru',
  brandUrl: '/',
  brandImage: './packages/icons/svgs/color/platform/CloudFullLogo.svg',
  brandTarget: '_self',
};

const parameters: Parameters = {
  controls: { expanded: true },
  actions: { argTypesRegex: '^on[A-Z].*' },
  options: {
    storySort: {
      order: ['Welcome', 'Theme', 'Typography', 'Utils', 'Components', 'Not stable'],
    },
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
    dark: { ...themes.dark, ...brandInfo, base: 'dark' },
    // Override the default light theme
    light: { ...themes.normal, ...brandInfo, base: 'light' },
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

const preview = {
  decorators,
  parameters,
  globalTypes,
};

// eslint-disable-next-line import/no-default-export
export default preview;
