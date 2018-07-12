'use strict';

const { resolveApp } = require('../config/utils');

module.exports = {
  dev: {
    appSrc: resolveApp('client/src'),
    publicPath: '/',
    devtool: 'cheap-module-source-map',
    host: '0.0.0.0',
    port: 3000,
    // 自动打开浏览器
    openBrowser: false,
    // 当存在编译器错误或警告时，在浏览器中显示全屏覆盖
    overlay: true,
    proxy: {}
  },
  build: {
    assetsRoot: resolveApp('dist'),
    publicPath: '/static/',
    devtool: 'cheap-module-source-map',
    // 开启生产环境 SourceMap
    prodSourceMap: true
  }
};
