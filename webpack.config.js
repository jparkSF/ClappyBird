const path = require('path');

module.exports = {
  entry: './assets/javascripts/clappybird.js',
  output: {
    path: path.resolve(__dirname, 'assets', 'javascripts'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: [/\.jsx?$/],
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '*'],
  }
};


