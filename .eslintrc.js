module.exports = {
  extends: ['@sbercloud/eslint-config/monorepo', 'plugin:testcafe-community/recommended'],
  plugins: ['testcafe-community'],
  rules: {
    '@typescript-eslint/no-namespace': 'off',
    // TODO: need to remove these rules and fix errors
    '@typescript-eslint/no-non-null-assertion': 'warn',
    'react-hooks/exhaustive-deps': 'warn',
  },
  ignorePatterns: 'packages/icons/src',
  overrides: [
    {
      files: ['packages/**/__tests__/**/*.ts'],
      rules: {
        'vitest/expect-expect': 'off',
        'vitest/no-done-callback': 'off',
        'vitest/no-conditional-in-test': 'off',
      },
    },
    {
      files: ['packages/*/stories/**/*', 'storybook/stories/**/*'],
      rules: {
        'react/function-component-definition': 'off',
      },
    },
  ],
};
