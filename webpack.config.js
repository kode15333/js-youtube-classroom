const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: "development",
  entry: path.join(__dirname, "src", "index"),
  watch: true,
  output: {
    path: path.join(__dirname, "dist"),
    chunkFilename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /.js$/,
        include: [path.resolve(__dirname, "src")],
        exclude: [path.resolve(__dirname, "node_modules")],
        loader: "babel-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: { extensions: [".json", ".js", ".ts"] },
  plugins: [
    new Dotenv(),
    new HtmlWebpackPlugin({ template: "./index.html" }),
    new CleanWebpackPlugin(),
  ],
  devtool: "source-map",
  devServer: {
    contentBase: path.join(__dirname, "/dist/"),
    inline: true,
    host: "localhost",
    port: 8080,
  },
};
