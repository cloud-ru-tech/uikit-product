import path from 'path';

import { StorybookConfig } from '@storybook/react-webpack5';
import { globSync } from 'glob';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import { RuleSetRule } from 'webpack';

import { getDependenciesLinks } from './utils/getDependenciesLinks';
import { getPackagesStatistics } from './utils/getPackagesStatistics';

const PACKAGES_STATISTICS = getPackagesStatistics();
const DEPENDENCIES_LINKS = getDependenciesLinks();

const STORIES = globSync(`packages/${process.env.STORYBOOK_PACKAGE_NAME || '*'}/stories/**/*.story.{ts,tsx}`)
  .map(x => path.resolve(__dirname, `../${x}`))
  .sort((a, b) => a.localeCompare(b));

const WELCOME = path.resolve(__dirname, './welcome/stories/Welcome.story.tsx');
const STATISTICS = path.resolve(__dirname, './welcome/stories/Statistics.story.tsx');
const isTestServer = Boolean(process.env.TEST_SERVER);

const mainConfig: StorybookConfig = {
  stories: [WELCOME, STATISTICS, ...STORIES],
  addons: [
    {
      name: '@storybook/preset-scss',
      options: {
        cssLoaderOptions: {
          modules: {
            auto: true,
            localIdentName: '[local]--[hash:base64:5]',
          },
        },
      },
    },
    '@cloud-ru/ft-storybook-readme-addon',
    '@storybook/addon-designs',
    {
      name: '@storybook/addon-storysource',
      options: {
        rule: {
          include: STORIES,
        },
        loaderOptions: {
          injectStoryParameters: true,
        },
      },
    },
    {
      name: '@storybook/addon-essentials',
      options: {
        backgrounds: false,
      },
    },
    '@geometricpanda/storybook-addon-badges',
    '@cloud-ru/ft-storybook-brand-addon',
    'storybook-dark-mode',
    '@cloud-ru/ft-storybook-deps-graph-addon',
    '@sbercloud/ft-storybook-deps-table-addon',
    '@storybook/addon-webpack5-compiler-babel',
  ],
  staticDirs: [{ from: '../packages/icons/svgs/color/logos', to: '/packages/icons/svgs/color/logos' }],
  framework: '@storybook/react-webpack5',
  typescript: {
    check: true,
    reactDocgen: 'react-docgen-typescript',
    checkOptions: {},
  },
  core: {
    disableTelemetry: true,
  },
  babel: (base: StorybookConfig['babel']) => ({
    ...base,
    plugins: [...(base.plugins || []), ...(isTestServer ? ['istanbul'] : [])],
  }),
  env: config => ({
    ...config,
    PACKAGES_STATISTICS: PACKAGES_STATISTICS as unknown as string,
    DEPENDENCIES_LINKS: DEPENDENCIES_LINKS as unknown as string,
    DEPS_URL: (process.env.DEPS_URL || '') as unknown as string,
  }),
  webpackFinal: async config => {
    isTestServer && (config.watch = false);
    isTestServer &&
      (config.watchOptions = {
        ignored: /.*/,
      });
    isTestServer && (config.mode = 'production');
    isTestServer && (config.devtool = false);

    if (config.resolve) {
      config.resolve.fallback = {
        ...(config.resolve?.fallback || {}),
        stream: require.resolve('stream-browserify'),
      };

      if (!config.resolve.plugins) {
        config.resolve.plugins = [];
      }

      config.resolve.plugins.push(
        new TsconfigPathsPlugin({
          configFile: './tsconfig.json',
          logLevel: 'INFO',
          extensions: ['.ts', '.tsx', '.json', '.svg', '.png'],
        }),
      );
    }

    const SVG_SPRITE_EXPRESSION = /\.symbol.svg$/;

    const fileLoaderRule = config.module?.rules?.find(rule => {
      if (typeof rule !== 'object') {
        return false;
      }

      return rule?.test?.toString().includes('svg');
    }) as RuleSetRule;

    if (fileLoaderRule) {
      fileLoaderRule.exclude = SVG_SPRITE_EXPRESSION;
    }

    config.module?.rules?.push({
      test: SVG_SPRITE_EXPRESSION,
      use: 'svg-inline-loader',
    });

    return config;
  },
};

// eslint-disable-next-line import/no-default-export
export default mainConfig;
