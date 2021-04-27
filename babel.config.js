const tsConfig = require('./tsconfig.json');

const alias = Object.entries(tsConfig.compilerOptions.paths).reduce(
  (reduction, [key, value]) => ({
    ...reduction,
    [key.slice(0, -2)]: `./${value[0].slice(0, -2)}`,
  }),
  {},
);

module.exports = {
  sourceType: 'unambiguous',
  presets: [
    !process.env.BUILD_TYPE && '@babel/preset-env',
    [
      '@babel/preset-react',
      {
        runtime: 'automatic',
      },
    ],
    '@babel/preset-typescript',
    !process.env.BUILD_TYPE && '@linaria',
  ].filter(Boolean),
  ignore: process.env.BUILD_TYPE ? ['src/**/*.stories.tsx'] : [],
  plugins: [
    process.env.BUILD_TYPE === 'cjs' &&
      '@babel/plugin-transform-modules-commonjs',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-nullish-coalescing-operator',
    [
      'module-resolver',
      {
        root: ['./'],
        alias,
      },
    ],
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
};
