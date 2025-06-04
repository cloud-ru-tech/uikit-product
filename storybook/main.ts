import path from 'path';

import { StorybookConfig } from '@storybook/react-vite';
import vitePluginReact from '@vitejs/plugin-react';
import { globSync } from 'glob';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

import { getDependenciesLinks } from './utils/getDependenciesLinks';
import { getPackagesStatistics } from './utils/getPackagesStatistics';

const PACKAGES_STATISTICS = getPackagesStatistics() || '';
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
  ],
  staticDirs: [{ from: '../packages/icons/svgs/color/logos', to: '/packages/icons/svgs/color/logos' }],
  framework: '@storybook/react-vite',
  core: {
    disableTelemetry: true,
  },
  typescript: {
    check: true,
    reactDocgen: 'react-docgen-typescript',
  },

  babel: (base: StorybookConfig['babel']) => ({
    ...base,
    plugins: [...(base.plugins || []), ...(isTestServer ? ['istanbul'] : [])],
  }),
  env: config => ({
    ...config,
    DEPENDENCIES_LINKS: DEPENDENCIES_LINKS as unknown as string,
    DEPS_URL: process.env.DEPS_URL || '',
    CUSTOM_STORYBOOK_ADDONS: (process.env.CUSTOM_STORYBOOK_ADDONS || '') as string,
    PACKAGES_STATISTICS: PACKAGES_STATISTICS as unknown as string,
  }),
  viteFinal: async viteConfig =>
    defineConfig({
      ...viteConfig,
      plugins: [
        ...(viteConfig.plugins || []),
        tsconfigPaths(),
        vitePluginReact(),
        svgr(),
        {
          name: 'markdown-loader',
          transform(code, id) {
            if (id.slice(-3) === '.md') {
              return `export default ${JSON.stringify(code)};`;
            }
          },
        },
      ],
      define: {
        'process.env': {
          ...viteConfig.define?.['process.env'],
          DEPENDENCIES_LINKS,
          DEPS_URL: process.env.DEPS_URL || '',
          CUSTOM_STORYBOOK_ADDONS: process.env.CUSTOM_STORYBOOK_ADDONS || '',
          TEST_SERVER: isTestServer || 'false',
          PACKAGES_STATISTICS,
        },
      },
    }),
};

// eslint-disable-next-line import/no-default-export
export default mainConfig;
