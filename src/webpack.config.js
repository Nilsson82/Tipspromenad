const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  context: path.resolve(__dirname, '..'),
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "../dist"),
    publicPath: "auto",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  devServer: {
    static: { directory: path.join(__dirname, "../public") },
    compress: true,
    port: 8081,
    historyApiFallback: true,
  },
  plugins: [
    {
      apply(compiler) {
        compiler.hooks.afterEmit.tap('CopyQuizAssets', () => {
          const fs = require('fs');
          const source = path.resolve(__dirname, '../public');
          for (const file of ['styles.css', 'Data', 'locales', 'lib']) {
            fs.cpSync(path.join(source, file), path.resolve(__dirname, '../dist', file), {recursive: true});
          }
        });
      }
    },
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
