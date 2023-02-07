const fs = require('fs')
const path = require('path')

module.exports = {
  index(res) {
    fs.readFile(path.resolve(__dirname, './template/index.html'), 'utf-8', (err, data) => {
      res.end(data)
    })
  },
  user(params, res) {
    res.end(JSON.stringify(params))
  }
}