var path = require("path");
var base_url = path.resolve(__dirname, "react");
module.exports = {
    entry: path.resolve(base_url, "app.jsx"),
    output: {
        path: base_url,
        filename: "bundle.js",
        publicPath: "/"
    },
    module: {
        loaders: [
            {
              test: /\.jsx?/,
              loader: "babel-loader",
              exclude: /node_modules/,
              include: path.resolve(__dirname, "react")
            }
        ]
    },
    devServer: {
    port: process.env.PORT || 8080,
    historyApiFallback: true,
    contentBase: './',
    hot: true
  }
};