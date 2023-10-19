const express = require('express')
const c = require('ansi-colors')
const router = require('./router/index')
const app = express()

const PORT = process.env.PORT || 3000

const loggerMiddle = (req, res, next) => {
  console.log(`[Request information] Method: ${req.method} URL: ${req.url} Time: ${new Date().toLocaleDateString()}`)
  next()
}

// 第三方中间件
app.use(loggerMiddle)

// 路由级别中间件
app.use(router)

// 错误处理中间件
app.use((req, res, next) => {
  res.status(404).send('404 Not find') // 匹配不到路由错误处理
}).use((error, req, res, next) => {
  console.log(error)
  res.status(500).send('service error') // 服务器内部报错错误处理
})


app.listen(PORT, () => {
  console.log(`Server is running at ${c.red.underline(`http://localhost:${PORT}`)}`)
})