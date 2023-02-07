const http = require('http')
const router = require('./router')
// 获取到服务器实例对象
const server = http.createServer()

// 监听网络服务端口
server.listen(8080, () => {
  console.log(`Listen: http://127.0.0.1:8080`)
})

// 监听请求
server.on('request', (req, res) => {
  router(req, res)
})