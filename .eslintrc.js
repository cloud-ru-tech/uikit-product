module.exports = {
  extends: [
    '@sbercloud/eslint-config/monorepo',
    'plugin:testcafe-community/recommended',
    'plugin:@cloud-ru/ssr-safe-react/recommended',
  ],
  plugins: ['testcafe-community'],
  rules: {
    '@typescript-eslint/no-namespace': 'off',
  },
  ignorePatterns: 'packages/icons/src',
  overrides: [
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
  ],
};
