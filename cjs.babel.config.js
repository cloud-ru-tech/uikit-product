module.exports = version =>
  require('./base.babel.config')('cjs', version, [
    [
      'replace-import-extension',
      {
        extMapping: { '.scss': '.css' },
      },
    ],
  ]);
