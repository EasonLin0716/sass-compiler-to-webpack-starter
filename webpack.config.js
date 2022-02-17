const webpack = require("webpack");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");
const glob = require("glob");

function toObject(paths) {
  const ret = {};

  paths.forEach(function (path) {
    if (/\/\_.*\.scss/.test(path)) return;
    ret[path.replace(".scss", "")] = path;
  });

  return ret;
}

const jsConfig = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
};

const cssConfig = {
  entry: toObject(glob.sync("src/assets/style/**/*.scss")),
  output: {
    path: path.resolve(__dirname, ""), // webpack 預設 output 為 dist，將其改為不指定
  },
  module: {
    rules: [
      {
        test: /\.s?css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader", // 增加瀏覽器prefix用，設定檔位於根目錄 postcss.config.js
          {
            loader: "sass-loader",
            options: {
              implementation: require("sass"), // 使用 sass-loader 建議的 dart-sass
              sassOptions: {
                outputStyle: "expanded", // 不去空白
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [new FixStyleOnlyEntriesPlugin(), new MiniCssExtractPlugin({})],
  resolve: {
    alias: {
      src: path.resolve(__dirname, "./src"), // 讓設定檔可用 src/.. 作為路徑
    },
  },
};

module.exports = [jsConfig, cssConfig];
