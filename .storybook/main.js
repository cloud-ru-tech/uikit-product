const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  stories: ['../packages/*/stories/*.@(ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    {
      name: '@storybook/addon-essentials',
      options: {
        backgrounds: false,
      },
    },
    'storybook-addon-themes',
    '@storybook/addon-storysource',
  ],
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

    config.resolve.plugins.push(
      new TsconfigPathsPlugin({
        configFile: './tsconfig.json',
        logLevel: 'info',
      }),
    );

    return config;
  },
};
