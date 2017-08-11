const webpack = require('webpack');
const path = require('path');

const config = {
  entry: {
    app: './src/scripts/app.js'
  },
  output: {
    filename: '[name].js',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader?limit=25000'
      },
      {
        test: /\.css$/,
        loader: 'style!css!autoprefixer',
        include: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: []
  },
  cache: false,
  watch: true,
  externals: {
    jquery: 'jQuery'
  },
  plugins: [],
  devtool: 'source-map'
};


module.exports = config;
