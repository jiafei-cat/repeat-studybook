const Router = require('@koa/router')
const userRouter = require('./user')
const videoRouter = require('./video')

const router = new Router({ prefix: '/api/v1' })

// 用户路由
router.use('/user', userRouter)
// 视频路由
router.use('/video', videoRouter)

module.exports = router
