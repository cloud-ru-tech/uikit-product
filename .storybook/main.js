const glob = require('glob');
const path = require('path');

module.exports = {
  stories: ['../packages/*/stories/*.@(ts|tsx)'],
  addons: [
    'storybook-readme',
    'storybook-addon-designs',
    {
      name: '@storybook/addon-storysource',
      options: {
        rule: {
          test: [/\.tsx?$/],
          include: glob.sync('packages/*/stories/*.{ts,tsx}').map(x => path.resolve(__dirname, `../${x}`)),
        },
      },
    },
    '@storybook/addon-links',
    {
      name: '@storybook/addon-essentials',
      options: {
        backgrounds: false,
      },
    },
    'storybook-addon-themes',
  ],
  core: {
    builder: 'webpack5',
  },
  typescript: {
    check: true,
    reactDocgen: 'react-docgen-typescript',
    checkOptions: {},
  },
  webpackFinal: async config => {
    config.module.rules[0].use.push({
      loader: '@linaria/webpack-loader',
      options: {
        sourceMap: true,
      },
    });

    return config;
  },
};
