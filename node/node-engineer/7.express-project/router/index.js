const express = require('express')

const userRouter = require('./user')
const videoRouter = require('./video')

const router = express.Router()

// 用户路由
router.use('/user', userRouter)
// 视频路由
router.use('/video', videoRouter)

module.exports = router