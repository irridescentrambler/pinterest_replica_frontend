var path = require("path");
var base_url = path.resolve(__dirname, "react");
const PORT = process.env.PORT || 4000;

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
            },
            {
              test: /\.css$/,
              use: [ 'style-loader', 'css-loader' ]
            }
        ]
    },
    devServer: {
    port: PORT,
    historyApiFallback: true,
    contentBase: './',
    hot: true,
    inline: true
  }
};