const path = require('node:path')

const Router = require('@koa/router')
const multer = require('@koa/multer')

const userValidator = require('../middleware/validator/user')
const userController = require('../controller/user')
const { jwt } = require('../utils')

const router = new Router()

const storage = multer.diskStorage({
  /** 上传后目录地址 */
  destination(req, file, cb) {
    cb(null, 'uploads/')
  },
  /** 上传后文件名配置 */
  filename(ctx, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  },
})

const upload = multer({ storage })

/** 注册 */
router.post('/registers', userValidator.register, userController.register)
/** 登录 */
router.post('/logins', userValidator.login, userController.login)
/** 获取所有用户列表 */
router.get('/lists', jwt.verifyToken(), userController.userList)
/** 更新用户信息 */
router.put('/', jwt.verifyToken(), userValidator.update, userController.update)
/** 上次头像 */
router.post('/avatar', jwt.verifyToken(), upload.single('avatar'), userValidator.avatar, userController.uploadAvatar)
/** 获取用户信息 */
router.get('/get-user/:userId', jwt.verifyToken(false), userController.getUser)
/** 用户订阅用户频道 */
router.get('/subscribe/:userId', jwt.verifyToken(), userController.subscribe)
/** 用户取消订阅用户频道 */
router.get('/unsubscribe/:userId', jwt.verifyToken(), userController.unsubscribe)
/** 用户频道的订阅者列表 */
router.get('/get-subscribe/:userId', jwt.verifyToken(), userController.getSubscribe)
/** 用户订阅的频道列表 */
router.get('/get-channel/:userId', jwt.verifyToken(), userController.getChannel)

module.exports = router.routes()
