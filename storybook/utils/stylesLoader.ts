const cssLoader = {
  loader: 'css-loader',
  options: {
    esModule: true,
    modules: {
      auto: (resPath: string) => resPath.includes('.module.'),
      localIdentName: '[local]--[hash:base64:5]',
      namedExport: false,
    },
  },
};

export const stylesLoaderConfig = {
  name: '@storybook/addon-styling-webpack',
  options: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', cssLoader],
      },
      {
        test: /\.scss$/i,
        use: [
          'style-loader',
          cssLoader,
          {
            loader: 'sass-loader',
            options: { implementation: require.resolve('sass') },
          },
        ],
      },
    ],
  },
};
