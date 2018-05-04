var webpack = require("webpack");
const path = require("path");
module.exports = {
  entry: ["./src/index.js"],
  output: {
    path: path.resolve("./asset/js"),
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        exclude: /node_modules/,
        loader: "babel",
        query: {
          presets: ["react", "es2015"]
        }
      },
      { test: /\.json$/, loader: "json" },
      {
        test: /\.scss$/,
        loaders: ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  },
  resolve: {
    extensions: ["", ".js", ".jsx", "css", "scss", "json"]
  },
  plugins: [
    new webpack.DefinePlugin({
      ENV: JSON.stringify("DEV")
    })
  ],
  devServer: {
    historyApiFallback: true,
    contentBase: "./"
  }
};
