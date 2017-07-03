const path = require('path');

module.exports = {
  entry: './app/index.js',
  output: {
    filename: 'js/bundle.js',
    path: path.resolve(__dirname, 'public_html'),
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ["babel-loader"]
      }
    ]
  }
};
