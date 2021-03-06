// 打包沒压缩版本
const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const webpackBaseConfig = require("./webpack.base.config.js");

module.exports = merge(webpackBaseConfig, {
  devtool: "source-map",

  entry: {
    main: "./src/index.js"
  },
  output: {
    path: path.resolve(__dirname, "../dist"),
    publicPath: "/dist/",
    filename: "hui.js",
    library: "hui",
    libraryTarget: "umd",
    umdNamedDefine: true
  },
  // 打包排除 vue、Element-UI
  externals: {
    vue: {
      root: "Vue",
      commonjs: "vue",
      commonjs2: "vue",
      amd: "vue"
    },
    'element-ui': 'ELEMENT'
  },
  plugins: [
    // @todo DefinePlugin 创建编译时 "配置的全局常量"  以方便进行 环境转换
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": '"development"'
    })
  ]
});
