module.exports = {
  template: require('./template.js')({}),
  indexTemplate: require('./indexTemplate.js'),
  ext: 'tsx',
  svgo: true,
  svgoConfig: {
    plugins: { removeViewBox: false },
  },
  svgProps: {
    'data-test-id': '{testId}',
  },
  typescript: true,
};
