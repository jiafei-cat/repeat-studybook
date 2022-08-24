module.exports = {
  entry: {
    index: './index.js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          plugins: [
            '@babel/plugin-transform-react-jsx'
          ]
        }
      }]
    }]
  },
  output: {
    filename: '[name].bundle.js',
    path: __dirname + 'dist'
  }
}