const { themeVars } = require('@sbercloud/figma-tokens-cloud-platform');

module.exports = {
  template: require('./template-illustrations.js')({ size: 24 }),
  indexTemplate: require('./indexTemplate.js'),
  ext: 'tsx',
  svgo: true,
  svgoConfig: {
    plugins: [
      {
        name: 'preset-default',
        params: {
          overrides: { removeViewBox: false },
        },
      },
      'prefixIds',
    ],
  },
  replaceAttrValues: {
    '#000': 'inherit',
    black: 'inherit',
  },
  svgProps: {
    fill: 'currentColor',
    'data-test-id': '{testId}',
    ref: '{ref}',
  },
  typescript: true,
};
