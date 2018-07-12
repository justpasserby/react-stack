'use strict';

const config = require('./index');
const devWebpackConfig = require('../config/webpack.dev');
const { notifierCallback } = require('../config/utils');
const portfinder = require('portfinder');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

// 如果要根据 webpack 配置文件中的 mode 变量更改行为，则必须导出函数而不是对象
module.exports = (env, argv) => {
  return new Promise((resolve, reject) => {
    portfinder.basePort = config.dev.port;
    portfinder
      .getPortPromise()
      .then(port => {
        // 获取空闲端口
        devWebpackConfig.devServer.port = port;
        devWebpackConfig.plugins.push(
          new FriendlyErrorsWebpackPlugin({
            compilationSuccessInfo: {
              messages: [
                `Your application is running here: http://${
                  devWebpackConfig.devServer.host
                }:${port}`
              ]
            },
            onErrors: notifierCallback()
          })
        );

        resolve(devWebpackConfig);
      })
      .catch(err => {
        reject(err);
      });
  });
};
