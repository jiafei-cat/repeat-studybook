const Koa = require('koa')
const { koaBody } = require('koa-body')
const cors = require('@koa/cors')
const router = require('./router')

const app = new Koa()

/** 使用中间件 */
app.use(cors()) // 处理跨域
app.use(koaBody()) // 处理request body
app.use(router.routes())

app.on('error', (error, ctx) => {
  console.log(error)
  ctx.body = `Server error: ${error}`
})

app.listen(3001, () => {
  console.log('Server is running at http://localhost:3001')
})
