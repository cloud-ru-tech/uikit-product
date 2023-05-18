import { StoryFn } from '@storybook/react';
import { DecoratorFunction, GlobalTypes, Parameters } from '@storybook/types';
import { FormProvider, useForm } from 'react-hook-form';
import { withDesign } from 'storybook-addon-designs';

import { Alert } from '@sbercloud/uikit-product-alert';
import { Link } from '@sbercloud/uikit-product-link';

import { ConfigProvider, Themes } from '../packages/utils/src';
import { BADGE } from './constants';
import { COLOR_MAP, useColorizeThemeButton } from './useColorizeThemeButton';

const LanguageCodeType = ConfigProvider.languages;

const decorators: DecoratorFunction[] = [
  withDesign,
  (Story: StoryFn, { globals: { locale, theme }, parameters: { badges, snackUiLink } }) => {
    useColorizeThemeButton(theme);

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
        <ConfigProvider theme={theme || ConfigProvider.themes.Purple} languageCode={locale || LanguageCodeType.ruRU}>
          <Story />
        </ConfigProvider>
      </FormProvider>
    </div>
  );
},
];

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
};

const getStyle = (theme: Themes) => ({
  background: COLOR_MAP[theme],
  width: '1rem',
  height: '1rem',
  borderRadius: '1rem',
  boxShadow: 'rgb(0 0 0 / 10%) 0px 0px 0px 1px inset',
});

const globalTypes: GlobalTypes = {
  theme: {
    name: 'Theme',
    description: 'Changing themes',
    defaultValue: Themes.Purple,
    toolbar: {
      icon: 'circlehollow',
      items: [
        { value: Themes.Purple, right: <div style={getStyle(Themes.Purple)} />, title: 'Purple' },
        { value: Themes.PurpleDark, right: <div style={getStyle(Themes.PurpleDark)} />, title: 'PurpleDark' },
        { value: Themes.Green, right: <div style={getStyle(Themes.Green)} />, title: 'Green' },
        { value: Themes.GreenDark, right: <div style={getStyle(Themes.GreenDark)} />, title: 'GreenDark' },
      ],
    },
  },
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
};

const preview = {
  decorators,
  parameters,
  globalTypes,
};

// eslint-disable-next-line import/no-default-export
export default preview;
