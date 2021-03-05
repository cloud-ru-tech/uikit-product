import * as React from 'react';
import { globals, purple, purpleDark } from '../src/theme';

export const decorators = [
  Story => {
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
  },
];

const changeTheme = theme => {
  const root = (document.querySelector(
    '#storybook-preview-iframe',
  ) as HTMLIFrameElement)?.contentDocument?.querySelector('body');

  if (!root) {
    return;
  }
  root.setAttribute('data-theme', theme?.name);
};

export const parameters = {
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
    ],
    onChange: changeTheme,
  },
};
