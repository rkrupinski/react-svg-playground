const { resolve } = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    main: resolve(__dirname, '..', 'src', 'index.tsx'),
    vendor: [
      'react',
      'react-dom',
      'normalize.css',
      'styled-components',
    ],
  },

  output: {
    path: resolve(__dirname, '..', 'build'),
    filename: '[chunkhash].[name].js',
    publicPath: '.',
  },

   plugins: [
    new CleanWebpackPlugin(['build'], {
      root: resolve(__dirname, '..'),
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: [
        'vendor',
        'manifest'
      ],
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
    }),
    new HtmlWebpackPlugin({
      template: resolve(__dirname, '..' ,'src', 'index.ejs'),
      title: 'react-svg-playground',
      minify: {
        collapseWhitespace: true,
      },
    }),
  ],
};
