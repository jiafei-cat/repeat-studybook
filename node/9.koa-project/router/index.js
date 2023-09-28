const Router = require('@koa/router')
const userRouter = require('./user')

const router = new Router({ prefix: '/api/v1' })

router.use('/user', userRouter)

module.exports = router
