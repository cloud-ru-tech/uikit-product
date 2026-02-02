import './styles.module.scss';

import { GlobalTypes, Parameters } from '@storybook/csf';
import { Preview } from '@storybook/react';
import { themes, ThemeVars } from '@storybook/theming';
import { FormProvider, useForm } from 'react-hook-form';

import {
  PARAM_CAN_ADD_CUSTOM_BRAND_KEY,
  PARAM_COLOR_MAP_KEY,
  PARAM_KEY,
  withBrand,
} from '@cloud-ru/ft-storybook-brand-addon';
import { Sprite, SpriteSystemSVG } from '@cloud-ru/uikit-product-icons';
import { LocaleProvider } from '@cloud-ru/uikit-product-locale';
import { Alert } from '@snack-uikit/alert';
import { Link } from '@snack-uikit/link';

import { ConfigProvider } from '../packages/utils/src/config';
import { themes as additionalThemes } from '../themes.config';
import { BADGE, Brand, DEFAULT_BRAND_COLORS_MAP, DEFAULT_BRAND_MAP } from './constants';

const LanguageCodeType = ConfigProvider.languages;

const url = process.env.DEPS_URL && new URL(process.env.DEPS_URL);

const decorators: Preview['decorators'] = [
  withBrand,
  (Story, { globals: { locale }, parameters: { badges, snackUiLink } }) => {
    const languageCode = locale || LanguageCodeType.ruRU;

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

          <LocaleProvider
            lang={languageCode}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            additionalTranslationsResources={undefined}
          >
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
  brandImage: 'storybook/assets/CloudFullLogoLight.svg',
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
      brandImage: 'storybook/assets/CloudFullLogoDark.svg',
    },
    // Override the default light theme
    light: {
      ...themes.normal,
      ...brandInfo,
      base: 'light',
      brandImage: 'storybook/assets/CloudFullLogoLight.svg',
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
    defaultValue: Brand.Default,
  },
  [PARAM_COLOR_MAP_KEY]: {
    name: 'Brand Map with Colors',
    description: 'Map of color for brands list',
    defaultValue: {
      ...Object.entries(DEFAULT_BRAND_COLORS_MAP).reduce((res: Record<string, string>, [key, value]) => {
        res[key as Brand] = value;
        return res;
      }, {}),
      ...additionalThemes.reduce((res: Record<string, string>, theme) => {
        res[theme.key] = theme.color;
        return res;
      }, {}),
    },
  },
  ...Object.entries(DEFAULT_BRAND_MAP).reduce((res: GlobalTypes, [key, value]) => {
    res[key as Brand] = {
      name: key,
      description: '',
      defaultValue: value,
    };
    return res;
  }, {}),
  ...additionalThemes.reduce((res: GlobalTypes, { key, name, defaultValue }) => {
    res[key] = {
      name,
      description: '',
      defaultValue,
    };
    return res;
  }, {}),
  [PARAM_CAN_ADD_CUSTOM_BRAND_KEY]: {
    name: 'Can add custom brand',
    defaultValue: false,
  },
};

const preview: Preview = {
  decorators,
  parameters,
  globalTypes,
};

export default preview;
