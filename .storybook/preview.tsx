/* @ts-ignore*/
import { LanguageCodeType, LanguageProvider } from '@sbercloud/uikit-react-localization';
import { addDecorator, addParameters } from '@storybook/react';
import React from 'react';
import { withDesign } from 'storybook-addon-designs';
import { addReadme } from 'storybook-readme';

import { globals, green, greenDark, purple, purpleDark } from '../packages/theme/src';

const changeTheme = (theme: { name: string }) => {
  const root = (
    document.querySelector('#storybook-preview-iframe') as HTMLIFrameElement
  )?.contentDocument?.querySelector('body');

  if (!root) {
    return;
  }
  root.setAttribute('data-theme', theme?.name);
};

addDecorator(addReadme);
addDecorator(withDesign);
addDecorator((Story, { globals: { locale } }) => {
  const root = document.querySelector('body');
  if (root && !root.getAttribute('data-theme')) {
    root.setAttribute('data-theme', 'purple');
  }

  return (
    // Add global styles and theme variables
    <div className={globals} id='story-root'>
      <LanguageProvider languageCode={locale || LanguageCodeType.ruRU}>
        {/* @ts-ignore*/}
        <Story />
      </LanguageProvider>
    </div>
  );
});

addParameters({
  actions: { argTypesRegex: '^on[A-Z].*' },
  options: {
    storySort: {
      order: ['Components', 'Not stable', 'Typography', 'Variables'],
    },
  },
  themes: {
    list: [
      { name: 'purple', class: purple, color: '#f3f3fe', default: true },
      { name: 'purpleDark', class: purpleDark, color: '#bcbced' },
      { name: 'green', class: green, color: '#07E897' },
      { name: 'greenDark', class: greenDark, color: '#157552' },
    ],
    onChange: changeTheme,
  },
});

export const globalTypes = {
  locale: {
    name: 'Locale',
    description: 'Internationalization locale',
    defaultValue: LanguageCodeType.ruRU,
    toolbar: {
      icon: 'globe',
      items: [
        { value: LanguageCodeType.ruRU, right: '🇷🇺', title: 'Русский' },
        { value: LanguageCodeType.enGB, right: '🇺🇸', title: 'English' },
      ],
    },
  },
};
