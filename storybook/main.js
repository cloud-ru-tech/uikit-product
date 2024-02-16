const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');
const glob = require('glob');
const path = require('path');
const { getPackagesStatistics } = require('./utils/getPackagesStatistics');
const { getDependenciesLinks } = require('./utils/getDependenciesLinks');

const PACKAGES_STATISTICS = getPackagesStatistics();
const DEPENDENCIES_LINKS = getDependenciesLinks();

const STORIES = glob
  .sync(`packages/${process.env.STORYBOOK_PACKAGE_NAME || '*'}/stories/**/*.{ts,tsx}`)
  .map(x => path.resolve(__dirname, `../${x}`));

const WELCOME = path.resolve(__dirname, './welcome/stories/Welcome.tsx');
const STATISTICS = path.resolve(__dirname, './welcome/stories/Statistics.tsx');
const isTestServer = Boolean(process.env.TEST_SERVER);

const regexForLinariaRule = /\.(mjs|tsx?|jsx?)$/;

const mainConfig = {
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
    '@sbercloud/ft-storybook-readme-addon',
    'storybook-addon-designs',
    {
      name: '@storybook/addon-storysource',
      options: {
        rule: {
          test: [/\.tsx?$/],
          include: STORIES,
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
    '@sbercloud/ft-storybook-brand-addon',
    'storybook-dark-mode',
    '@sbercloud/ft-storybook-deps-graph-addon',
  ],
  staticDirs: [
    { from: '../packages/icons/svgs/color/logos', to: '/packages/icons/svgs/color/logos' },
    { from: '../packages/icons/svgs/color/platform', to: '/packages/icons/svgs/color/platform' },
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {
      builder: {
        fsCache: true,
      },
    },
  },
  typescript: {
    check: true,
    reactDocgen: 'react-docgen-typescript',
    checkOptions: {},
  },
  core: {
    disableTelemetry: true,
  },
  features: {
    storyStoreV7: false,
  },
  babel: base => ({ ...base, plugins: [...(base.plugins || []), ...(isTestServer ? ['istanbul'] : [])] }),
  env: config => ({
    ...config,
    PACKAGES_STATISTICS,
    DEPENDENCIES_LINKS,
  }),
  webpackFinal: async config => {
    isTestServer && (config.watch = false);
    isTestServer &&
      (config.watchOptions = {
        ignored: /.*/,
      });
    isTestServer && (config.mode = 'production');
    isTestServer && (config.devtool = false);
    config.resolve.fallback = {
      ...config.resolve.fallback,
      stream: require.resolve('stream-browserify'),
    };

    const ruleForLinaria = config.module.rules.find(({ test }) => test?.toString() === regexForLinariaRule.toString());

    ruleForLinaria.use.push({
      loader: '@linaria/webpack-loader',
      options: {
        sourceMap: config.mode !== 'production',
      },
    });

    if (!config.resolve.plugins) {
      config.resolve.plugins = [];
    }

    config.resolve.plugins.push(
      new TsconfigPathsPlugin({
        configFile: './tsconfig.json',
        logLevel: 'INFO',
        extensions: ['.ts', '.tsx', '.json', '.svg', '.png', '.jpg'],
      }),
    );

    const SVG_SPRITE_EXPRESSION = /\.symbol.svg$/;

    const fileLoaderRule = config.module.rules.find(rule => rule.test && rule.test.toString().includes('svg'));

    if (fileLoaderRule) {
      fileLoaderRule.exclude = SVG_SPRITE_EXPRESSION;
    }

    config.module.rules.push({
      test: SVG_SPRITE_EXPRESSION,
      use: 'svg-inline-loader',
    });

    return config;
  },
  docs: {
    autodocs: false,
  },
};

// eslint-disable-next-line import/no-default-export
export default mainConfig;
