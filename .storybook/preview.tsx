import { addDecorator, addParameters } from '@storybook/react';
import React from 'react';

import { globals, green, greenDark, purple, purpleDark } from '../packages/theme';

const changeTheme = theme => {
  const root = (document.querySelector(
    '#storybook-preview-iframe',
  ) as HTMLIFrameElement)?.contentDocument?.querySelector('body');

  if (!root) {
    return;
  }
  root.setAttribute('data-theme', theme?.name);
};

addDecorator(Story => {
  const root = document.querySelector('body');
  if (root && !root.getAttribute('data-theme')) {
    root.setAttribute('data-theme', 'purple');
  }
  return (
    // Add global styles and theme variables
    <div className={globals} id='story-root'>
      <Story />
    </div>
  );
});

addParameters({
  actions: { argTypesRegex: '^on[A-Z].*' },
  options: {
    storySort: {
      order: ['Components', ['Button', ['Default']], 'Typography', 'Variables'],
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
