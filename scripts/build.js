'use strict';

const webpack = require('webpack');
const config = require('./index');
const prodWebpackConfig = require('../config/webpack.prod');
const rm = require('rimraf');
const ora = require('ora');
const chalk = require('chalk');

const spinner = ora('building for production...\n').start();

// 删除 dist 目录,启动 webpack
rm(config.build.assetsRoot, err => {
  if (err) throw err;

  webpack(prodWebpackConfig, (err, stats) => {
    if (err || stats.hasErrors()) {
      spinner.fail();

      console.log(chalk.red('  Build failed with errors.\n'));
      process.exit(1);
    }
    spinner.succeed();

    process.stdout.write(
      stats.toString({
        colors: true,
        modules: false,
        // 可显示 typescript 编译提示
        children: false,
        chunks: false,
        chunkModules: false
      }) + '\n\n'
    );

    console.log(chalk.cyan('  Build complete.\n'));
  });
});
