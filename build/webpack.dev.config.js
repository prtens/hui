/**
 * 本地预览
 */
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const merge = require("webpack-merge");
const webpackBaseConfig = require("./webpack.base.config.js");
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");

module.exports = merge(webpackBaseConfig, {
  devtool: "eval-source-map",

  // 入口
  entry: {
    main: "./examples/main",
    vendors: ["vue", "vue-router"]
  },
  // 输出
  output: {
    path: path.join(__dirname, "../examples/dist"),
    publicPath: "",
    filename: "[name].js",
    chunkFilename: "[name].chunk.js"
  },
  resolve: {
    alias: {
      hui: "../../src/index",
      vue: "vue/dist/vue.esm.js"
      // vue: 'vue/dist/vue.runtime.js'
    }
  },
  module: {
    rules: [
      {
        test: /\.md$/,
        use: [
          {
            loader: 'vue-loader',
            options: {
              compilerOptions: {
                preserveWhitespace: false
              }
            }
          },
          {
            loader: path.resolve(__dirname, './md-loader/index.js')
          }
        ]
      },
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendors",
      filename: "vendor.bundle.js"
    }),
    new HtmlWebpackPlugin({
      inject: true,
      filename: path.join(__dirname, "../examples/dist/index.html"),
      template: path.join(__dirname, "../examples/index.html")
    }),
    new FriendlyErrorsPlugin()
  ]
});
