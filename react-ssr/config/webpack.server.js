const path = require('path')
const webpackExternals = require('webpack-node-externals')

module.exports = {
  target: 'node',
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: path.resolve(__dirname, '../src/server.js'),
  output: {
    filename: 'bundle_server.js',
    path: path.resolve(__dirname, '../dist')
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
  externals: [webpackExternals()],
}