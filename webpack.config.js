const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const srcDir = path.resolve(__dirname, "src");
const distDir = path.resolve(__dirname, "dist");

module.exports = {
  entry: {
    app: path.join(srcDir, "index.js")
  },
  devtool: "inline-source-map",
  devServer: {
    contentBase: srcDir,
    hot: true,
    port: 9000
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.scss$/,
        use: [
          process.env.NODE_ENV !== "production"
            ? "style-loader"
            : MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader"
        ]
      }
    ]
  },
  optimization: {
    minimizer: [new OptimizeCSSAssetsPlugin({}), new UglifyJsPlugin()]
  },
  plugins: [
    new CleanWebpackPlugin(["dist"]),
    new CopyWebpackPlugin([
      { from: path.join(srcDir, "index.html"), to: "" },
      { from: path.join(srcDir, "img"), to: "img" }
    ]),
    process.env.NODE_ENV !== "production"
      ? new webpack.HotModuleReplacementPlugin()
      : null,
    new MiniCssExtractPlugin(
      { filename: "styles.css" },
      { options: { minify: true } }
    )
  ].filter(Boolean),
  output: {
    filename: "bundle.js",
    path: distDir
  }
};
