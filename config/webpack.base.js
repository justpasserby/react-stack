"use strict";

const config = require("../scripts/index");
const { resolveApp } = require("./utils");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

module.exports = {
  output: {
    path: config.build.assetsRoot,
    filename: "js/bundle.js",
    chunkFilename: "js/[name].chunk.js"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
    plugins: [
      // 使用 webpack 时加载在 tsconfig.json 的 paths 部分中指定位置的模块
      new TsconfigPathsPlugin({ configFile: resolveApp("tsconfig.json") })
    ]
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.(js|jsx|mjs)$/,
        loader: "source-map-loader",
        include: resolveApp("client")
      },
      {
        test: /\.(js|jsx|mjs)$/,
        loader: "babel-loader",
        include: [resolveApp("client"), resolveApp("server")],
        options: {
          compact: true
        }
      },
      {
        test: /\.(ts|tsx)$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              // 禁用类型检查器,将在 fork 插件中使用它
              transpileOnly: true
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: ["file-loader"]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ["file-loader"]
      }
    ]
  }
};
