const Koa = require('koa')
const Router = require('@koa/router')
const { koaBody } = require('koa-body')
const app = new Koa()

const router = new Router()

/** koa中间件列表: https://github.com/koajs/koa/wiki */

/** koa的中间件 */

/** koa/router 中间件 */
router.post('/userinfo/:id?', (ctx) => {
  console.log('请求content-type', ctx.request.type)
  /** 获取请求参数 */
  console.log('koa router中间件, 获取请求参数')
  /** 获取: query params (url上的参数) */
  console.log('query params', ctx.query)
  /** 获取: 设定的params */
  console.log('设定的params', ctx.params)
  /** 通过中间件 koa-body 获取到 request body (默认支持 urlencoded/json/text, 其他的form-data) */
  /** get/delete/head 请求不解析body 具体查看: https://github.com/koajs/koa-body#a-note-about-parsedmethods */
  console.log('request body', ctx.request.body)
  ctx.body = { username: 'test', userId: ctx.params.id }
})

app.use(koaBody())
app.use(router.routes())

/** koa/body 解析body的中间件 */

/** kao中处理上下文 */
/** koa会将http模块的request和response整合，全部放在koa自己的ctx中，方便使用 */
/** 例如: ctx.body, set值时会根据值的类型调用response.setHeader设置相应头content-type */
app.use((ctx, next) => {
  // ctx.req => 原生http模块的request
  // ctx.res => 原生http模块的response
  ctx.body = { 111: 111 }
  next()
})

/** koa的中间件机制, use会推入middleware中，最后通过compose组装执行中间件 */
/** next相当于下一个函数 (next() => dispatch(index) => Promise.resolve执行) */
/** 输出结果: one-1 => two-1 => one-2 => three-1 => tow-2 => three-2 */
/** 输出解释:
 * 注意点1: await 后的代码相当于被 new Promise(resolver).then()的 then 执行 (微任务)
 * 注意点2: next相当于 Promise.resolve 去执行下个中间件函数 (同步任务)
 * [one-1] => next()执行下个中间件 => [two-1](后面next console加入微任务) => [one-2](同步)
 * 微任务执行 next() => [three-1](后面代码又加入微任务) => [two-2] => 最后这个微任务执行 => [three-2]
 * */
app
  .use(async (ctx, next) => {
    console.log('koa 的中间件执行机制 - start')
    console.log('one-1')
    next()
    console.log('one-2')
  })
  .use(async (ctx, next) => {
    await console.log('two-1')
    next()
    await console.log('two-2')
  })
  .use(async (ctx, next) => {
    await console.log('three-1')
    next()
    console.log('three-2')
    console.log('koa 的中间件执行机制 - end')
  })

app.listen(3000, () => {
  console.log('http://127.0.0.1:3000')
})
