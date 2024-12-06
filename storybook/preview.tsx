import './styles.module.scss';

import {
  PARAM_CAN_ADD_CUSTOM_BRAND_KEY,
  PARAM_COLOR_MAP_KEY,
  PARAM_KEY,
  withBrand,
} from '@cloud-ru/ft-storybook-brand-addon';
import { GlobalTypes, Parameters } from '@storybook/csf';
import { Preview } from '@storybook/react';
import { themes, ThemeVars } from '@storybook/theming';
import { FormProvider, useForm } from 'react-hook-form';

import { Sprite, SpriteSystemSVG } from '@sbercloud/uikit-product-icons';
import { Alert } from '@snack-uikit/alert';
import { Link } from '@snack-uikit/link';
import { LocaleProvider } from '@snack-uikit/locale';

import { ConfigProvider } from '../packages/utils/src';
import { BADGE, Brand, DEFAULT_BRAND_COLORS_MAP, DEFAULT_BRAND_MAP } from './constants';

const LanguageCodeType = ConfigProvider.languages;

const url = process.env.DEPS_URL && new URL(process.env.DEPS_URL);

const decorators: Preview['decorators'] = [
  withBrand,
  (Story, { globals: { locale }, parameters: { badges, snackUiLink } }) => {
    const methods = useForm({
      mode: 'onSubmit',
      reValidateMode: 'onSubmit',
      shouldFocusError: true,
      shouldUnregister: true,
    });
    return (
      <div id='story-root'>
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
            <Story />
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
      order: ['Welcome', 'Console', 'Site', 'Utils', 'Mobile', 'Deprecated'],
    },
  },
  dependenciesGraph: {
    graphLinks: process.env.DEPENDENCIES_LINKS,
  },
  packagesUrl: url ? url.pathname : undefined,
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
  [Brand.Admin]: {
    name: 'Brand Admin',
    description: '',
    defaultValue: DEFAULT_BRAND_MAP[Brand.Admin],
  },
  [Brand.Site]: {
    name: 'Brand Site',
    description: '',
    defaultValue: DEFAULT_BRAND_MAP[Brand.Site],
  },
};

const preview: Preview = {
  decorators,
  parameters,
  globalTypes,
};

// eslint-disable-next-line import/no-default-export
export default preview;
