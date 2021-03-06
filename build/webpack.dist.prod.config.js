// 打包压缩版本
const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const webpackBaseConfig = require("./webpack.base.config.js");
const CompressionPlugin = require("compression-webpack-plugin"); // Gzip压缩
const UglifyJsPlugin = require("uglifyjs-webpack-plugin"); // 压缩优化 js文件

module.exports = merge(webpackBaseConfig, {
  devtool: "source-map",
  entry: {
    main: "./src/index.js"
  },
  output: {
    path: path.resolve(__dirname, "../dist"),
    publicPath: "/dist/",
    filename: "hui.min.js",
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
    // @todo
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": '"production"'
    }),
    new UglifyJsPlugin({
      parallel: true,
      sourceMap: true
    }),
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.(js|css)$/,
      threshold: 10240,
      minRatio: 0.8
    })
  ]
});
