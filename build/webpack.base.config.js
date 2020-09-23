/**
 * 公共配置
 */
const path = require("path");
const webpack = require("webpack");
const WebpackBar = require('webpackbar');

const pkg = require("../package.json");
const isProd = process.env.NODE_ENV === "production";

function resolve(dir) {
  return path.join(__dirname, "..", dir);
}

module.exports = {
  // 加载器
  module: {
    // https://doc.webpack-china.org/guides/migrating/#module-loaders-module-rules
    rules: [
      {
        // https://vue-loader.vuejs.org/en/configurations/extract-css.html
        test: /\.vue$/,
        loader: "vue-loader"
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        options: {
          sourceMap: true
        },
        exclude: /node_modules/
      },
      {
        test: /\.(scss|css)$/,
        use: [
          isProd ? "vue-style-loader" : "style-loader",
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.svg$/,
        loader: "svg-sprite-loader",
        include: [resolve("src/icons")],
        options: {
          symbolId: "hn-icon-[name]"
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: "url-loader?limit=8192",
        exclude: [resolve("src/icons")]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: "url-loader?limit=8192"
      }
    ]
  },
  resolve: {
    extensions: [".js", ".vue"],
    alias: {
      vue: "vue/dist/vue.esm.js",
      "@": resolve("src")
    }
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.DefinePlugin({
      "process.env.VERSION": `'${pkg.version}'`
    }),
    new WebpackBar()
  ]
};
