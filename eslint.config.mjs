import ssrSafe from '@cloud-ru/eslint-plugin-ssr-safe-react';

import monorepoEslintConfig from '@sbercloud/eslint-config/monorepo';

export default [
  ...monorepoEslintConfig,
  ssrSafe.recommended,
  {
    plugins: {
      '@cloud-ru/ssr-safe-react': ssrSafe,
    },
  },
  {
    ignores: ['**/dist/**/*', 'packages/icons/src/components/**/*', 'packages/icons/templates/**/*'],
  },
  {
    rules: {
      '@typescript-eslint/no-namespace': 'off',
    },
  },
  {
    files: ['packages/**/__tests__/**/*.ts'],
    rules: {
      'vitest/expect-expect': 'off',
      'vitest/no-done-callback': 'off',
      'vitest/no-conditional-in-test': 'off',
      '@cloud-ru/ssr-safe-react/domApi': 'off',
    },
  },
  {
    files: ['packages/*/stories/**/*', 'storybook/stories/**/*'],
    rules: {
      'react/function-component-definition': 'off',
      '@cloud-ru/ssr-safe-react/domApi': 'off',
    },
  },
  {
    files: [
      'storybook/stories/**/*',
      'storybook/preview.tsx',
      'scripts/scss-extension-transformer.ts',
      'storybook/main.js',
      'eslint.config.mjs',
      'vitest.config.ts',
    ],
    rules: {
      'import/no-default-export': 'off',
    },
  },
];
