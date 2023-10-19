const path = require('node:path')
const express = require('express')
const multer = require('multer')

const { jwt } = require('../utils')
const { userController } = require('../controller')
const { validationResult } = require('express-validator')
const userValidator = require('../middleware/validator/userValidator')

/** 临时存放当前上传的文件名 (用于判断客户端是否传入了avatar参数) */
let curryFileName = null

const storage = multer.diskStorage({
  /** 上传后目录地址 */
  destination(req, file, cb) {
    cb(null, 'uploads/')
  },
  /** 上传后文件名配置 */
  filename(req, file, cb) {
    /** 临时存放当前上传的文件名 (用于判断客户端是否传入了avatar参数) */
    req.curryFileName = file.originalname
    cb(null, Date.now() + path.extname(file.originalname))
  },
})

const upload = multer({ storage })

const router = express.Router()

router.post('/registers', userValidator.register, userController.register)
router.post('/logins', userValidator.login, userController.login)

router.get('/lists', jwt.verifyToken(), userController.userList)
router.put('/', jwt.verifyToken(), userValidator.update, userController.update)
router.post('/avatar', jwt.verifyToken(), upload.single('avatar'), userValidator.avatar, userController.uploadAvatar)

router.get('/get-user/:userId', jwt.verifyToken(false), userController.getUser)
router.get('/subscribe/:userId', jwt.verifyToken(), userController.subscribe)
router.get('/unsubscribe/:userId', jwt.verifyToken(), userController.unsubscribe)
router.get('/get-subscribe/:userId', jwt.verifyToken(), userController.getSubscribe)
router.get('/get-channel/:userId', jwt.verifyToken(), userController.getChannel)

module.exports = router
