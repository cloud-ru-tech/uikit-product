module.exports = buildType => ({
  sourceType: 'unambiguous',
  presets: [
    !buildType && ['@babel/preset-env', { loose: false }],
    [
      '@babel/preset-react',
      {
        runtime: 'automatic',
        loose: false,
      },
    ],
    ['@babel/preset-typescript', { loose: false }],
    !buildType && '@linaria',
  ].filter(Boolean),
  plugins: [
    buildType === 'cjs' && '@babel/plugin-transform-modules-commonjs',
    '@babel/plugin-proposal-export-namespace-from',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-nullish-coalescing-operator',
  ].filter(Boolean),
});
