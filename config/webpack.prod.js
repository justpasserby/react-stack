'use strict';

const { smart } = require('webpack-merge');
const base = require('./webpack.base');
const { resolveApp, urlLoaders } = require('./utils');
const config = require('../scripts/index');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const publicPath = config.build.publicPath;

const prodWebpackConfig = smart(base, {
  entry: {
    app: resolveApp('client/src/index.tsx')
  },
  output: {
    filename: 'js/[name].[chunkhash:8].js',
    chunkFilename: 'js/[name].[chunkhash:8].chunk.js',
    publicPath: publicPath
  },
  mode: 'production',
  module: {
    rules: [...urlLoaders()]
  },
  devtool: config.build.prodSourceMap ? config.build.devtool : false,
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: resolveApp('public/index.html'),
      minify: {
        removeComments: true,
        useShortDoctype: true,
        collapseWhitespace: true,
        removeEmptyAttributes: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),
    new ForkTsCheckerWebpackPlugin({
      async: false,
      tsconfig: resolveApp('tsconfig.prod.json'),
      tslint: resolveApp('tslint.json')
    })
  ]
});

module.exports = prodWebpackConfig;
