module.exports = {
  extends: '@cloud-ru/ft-config-stylelint',
  overrides: [
    {
      files: ['**/*.{js,ts,jsx,tsx}'],
      extends: '@linaria/stylelint-config-standard-linaria',
      customSyntax: '@linaria/postcss-linaria',
      rules: {
        'string-quotes': 'single',
        'selector-attribute-quotes': null,
        'selector-pseudo-class-no-unknown': null,
        'no-eol-whitespace': null,
        indentation: null,
        'value-keyword-case': [
          'lower',
          {
            camelCaseSvgKeywords: true,
          },
        ],
        'custom-property-empty-line-before': null,
        'function-whitespace-after': null,
        'selector-class-pattern': null,
        'block-opening-brace-newline-after': null,
        'declaration-colon-space-after': null,
        'property-no-vendor-prefix': null,
        'selector-type-no-unknown': null,
        'custom-property-pattern': null,
        'value-list-max-empty-lines': null,
        'declaration-colon-newline-after': null,
        'color-function-notation': 'legacy',
      },
    },
  ],
};
