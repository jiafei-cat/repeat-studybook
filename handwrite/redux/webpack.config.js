const path = require('path')

module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js',
  },
  output: {
    globalObject: 'this',
    libraryTarget: 'umd',
    library: 'redux',
    path: path.resolve(__dirname, './dist')
  }
}