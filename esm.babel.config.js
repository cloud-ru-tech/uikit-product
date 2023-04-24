module.exports = version =>
  require('./base.babel.config')('esm', version, [
    [
      'replace-import-extension',
      {
        extMapping: { '.scss': '.css' },
      },
    ],
  ]);
