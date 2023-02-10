const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const router = require('./router')

const app = express()

const PORT = process.env.PORT || 3000

// 内置middleware的使用
app.use(express.json()) // 解析content-type: application/json
app.use(express.urlencoded()) // 解析content-type: application/x-www-form-urlencoded

// 第三方middleware使用
app.use(cors()) // 解决跨域
app.use(morgan('dev')) // 日志记录

app.use('/api/v1', router)

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})