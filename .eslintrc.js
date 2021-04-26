module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: [
    '@atamore/eslint-config-atamore',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
  ],
  rules: {
    'no-use-before-define': 0,
    'no-param-reassign': ['error', { props: false }],
    'react/display-name': 0,
    'react/jsx-props-no-spreading': 0,
    'arrow-body-style': ['error', 'as-needed'],
    '@typescript-eslint/no-empty-interface': 0,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/ban-ts-comment': 0,
    '@typescript-eslint/no-empty-function': 0,
    '@typescript-eslint/no-use-before-define': ['error'],
    'react/react-in-jsx-scope': 0,
    'react/no-unused-prop-types': 0,
    'react/jsx-fragments': [2, 'syntax'],
    'react-hooks/exhaustive-deps': 0,
  },
  overrides: [
    {
      files: ['**/*.tsx'],
      rules: {
        'react/prop-types': 'off',
        'no-restricted-syntax': 'off',
      },
    },
  ],
};
