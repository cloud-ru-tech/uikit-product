import path from 'path';

import { StorybookConfig } from '@storybook/react-webpack5';
import { EsbuildPlugin } from 'esbuild-loader';
import { globSync } from 'glob';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import { RuleSetRule } from 'webpack';

import { getDependenciesLinks } from './utils/getDependenciesLinks';
import { getPackagesStatistics } from './utils/getPackagesStatistics';
import { stylesLoaderConfig } from './utils/stylesLoader';

const PACKAGES_STATISTICS = getPackagesStatistics();
const DEPENDENCIES_LINKS = getDependenciesLinks();

const STORIES = globSync(`packages/${process.env.STORYBOOK_PACKAGE_NAME || '*'}/stories/**/*.story.{ts,tsx}`)
  .map(x => path.resolve(__dirname, `../${x}`))
  .sort((a, b) => a.localeCompare(b));

const WELCOME = path.resolve(__dirname, './stories/Welcome.story.tsx');
const STATISTICS = path.resolve(__dirname, './stories/Statistics.story.tsx');
const isTestServer = Boolean(process.env.TEST_SERVER);

const needToCompileIcons = process.env.STORYBOOK_PACKAGE_NAME?.includes('icons');

const STATIC_DIRS = [
  { from: '../storybook/assets', to: '/storybook/assets' },
  { from: '../storybook/assets', to: '/assets' },
];

const mainConfig: StorybookConfig = {
  stories: [WELCOME, STATISTICS, ...STORIES],
  addons: [
    stylesLoaderConfig,
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
    ...(process.env.CUSTOM_STORYBOOK_ADDONS?.split(' ') ?? []),
  ],
  staticDirs: needToCompileIcons
    ? [...STATIC_DIRS, { from: '../packages/icons/svgs/color/logos', to: '/packages/icons/svgs/color/logos' }]
    : STATIC_DIRS,
  framework: '@storybook/react-webpack5',
  typescript: {
    check: true,
    reactDocgen: 'react-docgen-typescript',
    checkOptions: {},
  },
  core: {
    disableTelemetry: true,
  },
  env: config => ({
    ...config,
    PACKAGES_STATISTICS: PACKAGES_STATISTICS as unknown as string,
    DEPENDENCIES_LINKS: DEPENDENCIES_LINKS as unknown as string,
    DEPS_URL: (process.env.DEPS_URL || '') as unknown as string,
    CUSTOM_STORYBOOK_ADDONS: (process.env.CUSTOM_STORYBOOK_ADDONS || '') as string,
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

    // Настройка esbuild-loader для TypeScript и JavaScript файлов
    if (config.module?.rules) {
      const esbuildLoaderExclude = [/node_modules/, /storybook-config-entry\.js$/, /storybook-stories\.js$/];

      config.module.rules.push(
        {
          test: /\.ts$/,
          use: [
            {
              loader: 'esbuild-loader',
              options: {
                loader: 'ts',
                target: 'es2018',
                format: 'esm',
              },
            },
          ],
          exclude: esbuildLoaderExclude,
        },
        {
          test: /\.tsx$/,
          use: [
            {
              loader: 'esbuild-loader',
              options: {
                loader: 'tsx',
                target: 'es2018',
                jsx: 'automatic',
                format: 'esm',
              },
            },
          ],
          exclude: esbuildLoaderExclude,
        },
      );
    }

    if (config.optimization) {
      config.optimization.minimizer = [
        new EsbuildPlugin({
          target: 'es2018',
          css: true,
        }),
      ];
    }

    return config;
  },
};

// eslint-disable-next-line import/no-default-export
export default mainConfig;
