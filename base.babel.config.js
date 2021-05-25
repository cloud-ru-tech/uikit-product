module.exports = buildType => ({
  sourceType: 'unambiguous',
  presets: [
    !buildType && '@babel/preset-env',
    [
      '@babel/preset-react',
      {
        runtime: 'automatic',
      },
    ],
    '@babel/preset-typescript',
    !buildType && '@linaria',
  ].filter(Boolean),
  plugins: [
    buildType === 'cjs' && '@babel/plugin-transform-modules-commonjs',
    '@babel/plugin-proposal-export-namespace-from',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-nullish-coalescing-operator',
    [
      'inline-react-svg',
      {
        ignorePattern: /assets\.svg$/,
        svgo: {
          plugins: [
            {
              cleanupIDs: true,
            },
          ],
        },
      },
    ],
  ].filter(Boolean),
});
