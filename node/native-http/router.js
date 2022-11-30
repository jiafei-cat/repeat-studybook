const fs = require('fs')
const { URLSearchParams } = require('url')
const path = require('path')
const controller = require('./controller')

module.exports = (req, res) => {
  if (req.method === 'GET') {
    if (req.url === '/') {
      controller.index(res)
    } else {
      fs.readFile(path.resolve(__dirname, './static/test.png'), (err, data) => {
        res.end(data)
      })
    } 
  } else if (req.method === 'POST') {
    let data = ''
    req.on('data', chunk => {
      data += chunk
    })

    req.on('end', () => {
      const postParamsURL = new URLSearchParams(data)
      const postParams = Object.fromEntries(postParamsURL)
      controller.user(postParams, res)
    })
  }
}