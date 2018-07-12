'use strict';

const path = require('path');
const notifier = require('node-notifier');

exports.resolveApp = relativePath => path.join(__dirname, '..', relativePath);

// webpack 提示编译错误回调
exports.notifierCallback = () => {
  return (severity, errors) => {
    if (severity !== 'error') {
      return;
    }
    const error = errors[0];

    notifier.notify({
      title: 'Webpack error',
      subtitle: error.file || '',
      message: severity + ': ' + error.name,
      icon: path.join(__dirname, 'logo.png')
    });
  };
};

exports.urlLoaders = () => {
  return [
    {
      test: /\.(png|jpe?g|gif|svg)$/,
      loader: 'url-loader',
      options: {
        limit: 1000,
        name: 'img/[name].[hash:8].[ext]'
      }
    },
    {
      test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)$/,
      loader: 'url-loader',
      options: {
        limit: 1000,
        name: 'media/[name].[hash:8].[ext]'
      }
    },
    {
      test: /\.(woff2?|eot|ttf|otf)$/,
      loader: 'url-loader',
      options: {
        limit: 1000,
        name: 'fonts/[name].[hash:8].[ext]'
      }
    }
  ];
};
