const baseConfig = require('@sbercloud/ft-all-linters-pack').defaultEslintConfig;

module.exports = {
  ...baseConfig,
  extends: [...baseConfig.extends, 'plugin:cypress/recommended'],
  rules: { ...baseConfig.rules, '@typescript-eslint/no-namespace': 'off' },
  ignorePatterns: 'packages/icons/src',
  overrides: [
    ...baseConfig.overrides,
    {
      files: ['*.ts', '*.tsx'],
      rules: { 'deprecation/deprecation': 'off' },
    },
    {
      files: ['packages/*/stories/*.ts', 'packages/*/stories/*.tsx'],
      rules: { 'import/no-default-export': 'off' },
    },
  ],
};
