var webpack = require("webpack");

module.exports = {
  entry: ["./src/index.js"],
  output: {
    path: __dirname,
    publicPath: "/",
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
      ENV: JSON.stringify("PROD")
    })
  ],
  devServer: {
    historyApiFallback: true,
    contentBase: "./"
  }
};
