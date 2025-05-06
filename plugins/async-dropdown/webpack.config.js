const path = require('path');
module.exports = {
  entry: `./src/components/index.tsx`,
  externals: {
    react: 'react',
    '@khulnasoft.com/sdk': '@khulnasoft.com/sdk',
    '@material-ui/core': '@material-ui/core',
    '@emotion/core': '@emotion/core',
    '@emotion/styled': '@emotion/styled',
  },
  output: {
    filename: 'khulnasoft-plugin-async-dropdown.system.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'system',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
          },
        ],
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 1268,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
};
