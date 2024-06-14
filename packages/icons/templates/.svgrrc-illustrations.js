const { themeVars } = require('@sbercloud/figma-tokens-cloud-platform');

module.exports = {
  template: require('./template-illustrations.js')({ size: 20 }),
  indexTemplate: require('./indexTemplateIllustrations.js'),
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
    '#389F74': themeVars.sys.primary.accentDefault,
    '#0A402C': themeVars.sys.primary.textMain,
  },
  svgProps: {
    fill: 'none',
    'data-test-id': '{testId}',
    ref: '{ref}',
  },
  typescript: true,
};
