const { home } = require("./templateParameters");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const isDevelopment = process.env.NODE_ENV !== "production";

module.exports = [
  {
    template: "./src/pages/index.handlebars",
    filename: "index.html",
    templateParameters: home
  }
].map(page => {
  const { filename, template, templateParameters } = page;
  return new HtmlWebpackPlugin({
    title: "Title",
    template,
    templateParameters,
    filename,
    minify: !isDevelopment && {
      html5: true,
      caseSensitive: true,
      removeComments: true
    }
  });
});
