const express = require('express')
const path = require('path')
const router = express.Router()

// 路由中间件的使用

router.get('/', (req, res) => {
  res.send('/index')
})

router.get('/register', (req, res) => {
  JSON.parse('(')
  res.send('/register')
})

router.get('/login', (req, res) => {
  res.send(new Buffer('wahoo'))
})

router.get('/users?', (req, res, next) => {
  res.send(`${req.url}`)
})

router.get('/user/:id/:a?/:b?', (req, res, next) => {
  res.send(`${JSON.stringify(req.params)}`)
})

module.exports = router