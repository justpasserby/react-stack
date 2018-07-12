'use strict';

const webpack = require('webpack');
const path = require('path');
const { smart } = require('webpack-merge');
const base = require('./webpack.base');
const { resolveApp, urlLoaders } = require('./utils');
const config = require('../scripts/index');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const publicPath = config.dev.publicPath;

const devWebpackConfig = smart(base, {
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    config.dev.appSrc
  ],
  output: {
    publicPath: publicPath
  },
  mode: 'development',
  module: {
    rules: [...urlLoaders()]
  },
  devtool: config.dev.devtool,
  devServer: {
    contentBase: config.build.assetsRoot,
    hot: true,
    host: config.dev.host,
    port: config.dev.port,
    // webpack 中的错误或警告将不写入控制台,这儿使用 FriendlyErrorsPlugin 插件
    quiet: true,
    compress: true,
    open: config.dev.openBrowser,
    overlay: config.dev.overlay
      ? {
          warnings: true,
          errors: true
        }
      : false,
    publicPath: publicPath,
    historyApiFallback: {
      rewrites: [
        {
          from: /.*/,
          to: path.posix.join(publicPath, 'index.html')
        }
      ]
    },
    proxy: config.dev.proxy
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: resolveApp('public/index.html')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new ForkTsCheckerWebpackPlugin({
      async: false,
      watch: config.dev.appSrc,
      tsconfig: resolveApp('tsconfig.json'),
      tslint: resolveApp('tslint.json')
    })
  ]
});

module.exports = devWebpackConfig;
