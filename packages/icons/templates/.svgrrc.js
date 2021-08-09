module.exports = {
  template: require('./template.js')({ size: 20 }),
  indexTemplate: require('./indexTemplate.js'),
  ext: 'tsx',
  svgo: true,
  svgoConfig: {
    plugins: { removeViewBox: false },
  },
  replaceAttrValues: {
    currentColor: 'inherit',
    currentFill: 'inherit',
    '#D2D2D2': 'inherit',
    '#C4C4C4': 'inherit',
    '#E5E5E5': 'inherit',
    '#CCCCCC': 'inherit',
    '#A0A0A0': 'inherit',
    '#CCC': 'inherit',
  },
  svgProps: {
    fill: 'inherit',
    'data-test-id': '{testId}',
  },
  typescript: true,
};
