const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
var Promise = require("es6-promise-promise");
const webpack = require("webpack");

const isProd = process.env.NODE_ENV === "production";

const config = {
  mode: isProd ? "production" : "development",
  entry: {
    index: ["@babel/polyfill", "./src/index.tsx"],
  },
  output: {
    path: resolve(__dirname, "dist"),
    filename: "[name].js",
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
    }),
    new CopyPlugin({
      patterns: [{ from: "public" }],
    }),
    new webpack.ProvidePlugin({
      Promise: "es6-promise-promise",
    }),
    new webpack.DefinePlugin({
      "process.env.PROD_API_ENDPOINT": "'http://localhost:5000/data.json'",
      "process.env.DEV_API_ENDPOINT": "'http://localhost:3000/data.json'",
    }),
  ],
};

if (isProd) {
  config.optimization = {
    minimize: true,
    minimizer: [new TerserWebpackPlugin()],
  };
} else {
  // https://webpack.js.org/configuration/dev-server
  config.devServer = {
    open: true,
    hot: true,
    compress: true,
    disableHostCheck: true,
    stats: "errors-only",
    overlay: true,
  };
}

module.exports = config;
