const { themeVars } = require('@sbercloud/figma-tokens-cloud-platform');

module.exports = {
  template: require('./template-illustrations.js')({ size: 20 }),
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
  svgProps: {
    fill: 'none',
    'data-test-id': '{testId}',
    ref: '{ref}',
  },
  typescript: true,
};
