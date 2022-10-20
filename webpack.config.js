const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
var Promise = require("es6-promise-promise");
const webpack = require("webpack");

const isProd = process.env.NODE_ENV === "prod";

const config = {
  mode: isProd ? "production" : "development",
  entry: "./src/index.tsx",
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
        test: /\.(js|ts)x?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  performance: {
    // Turn off size warnings for entry points
    hints: false,
  },
  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        // TODO: Customize code splitting to your needs
        vendor: {
          name: "vendor",
          test: /[\\/]node_modules[\\/]/,
          chunks: "all",
        },
        components: {
          name: "components",
          test: /[\\/]src[\\/]components[\\/]/,
          chunks: "all",
          minSize: 0,
        },
      },
    },
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
      "process.env.PROD_API_ENDPOINT":
        "'https://api.roche.fedeiglesias.com/data'",
      "process.env.DEV_API_ENDPOINT": "'http://localhost:3000/dev/data'",
    }),
  ],
};

if (isProd)
  config.optimization = {
    minimize: true,
    minimizer: [new TerserWebpackPlugin()],
  };

if (!isProd)
  config.devServer = {
    open: true,
    hot: true,
    compress: true,
    client: {
      overlay: true,
    },
  };

module.exports = config;
