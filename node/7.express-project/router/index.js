const express = require('express')
const userRouter = require('./user')
const videoRouter = require('./video')

const router = express.Router()

router.use('/user', userRouter)
router.use('/video', videoRouter)

module.exports = router