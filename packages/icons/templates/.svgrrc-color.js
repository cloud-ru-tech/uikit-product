module.exports = {
  template: require('./template.js')({}),
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
    'data-test-id': '{testId}',
    ref: '{ref}',
  },
  typescript: true,
};
