const path = require('path')
const webpackExternals = require('webpack-node-externals')

module.exports = {
  target: 'web',
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: path.resolve(__dirname, '../src/client.js'),
  output: {
    filename: 'bundle_client.js',
    path: path.resolve(__dirname, '../dist/public')
  },
  resolve: {
    extensions: ['.tsx', '.jsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      }
    ]
  },
}