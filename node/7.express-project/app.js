const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const path = require('path')

require('dotenv').config({
  path: path.resolve(__dirname, './env/.env.development')
})
const router = require('./router')

const app = express()

const PORT = process.env.PORT || 3001

// express内置middleware的使用
app.use(express.json()) // 解析content-type: application/json
app.use(express.urlencoded()) // 解析content-type: application/x-www-form-urlencoded
app.use(express.static('uploads'))
// 第三方middleware使用a
app.use(cors()) // 解决跨域
app.use(morgan('dev')) // 日志记录

// 使用路由中间件
app.use('/api/v1', router)

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})