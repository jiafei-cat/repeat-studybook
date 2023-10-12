const Router = require('@koa/router')
const multer = require('@koa/multer')

const userValidator = require('../middleware/validator/user')
const userController = require('../controller/user')
const { jwt } = require('../utils')

const router = new Router()

/** 临时存放当前上传的文件名 (用于判断客户端是否传入了avatar参数) */
let curryFileName = null

const storage = multer.diskStorage({
  /** 上传后目录地址 */
  destination(req, file, cb) {
    cb(null, 'uploads/')
  },
  /** 上传后文件名配置 */
  filename(ctx, file, cb) {
    /** 临时存放当前上传的文件名 (用于判断客户端是否传入了avatar参数) */
    ctx.curryFileName = file.originalname
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
router.put('/', jwt.verifyToken(), userValidator.update, userController.update)
router.post('/avatar', jwt.verifyToken(), upload.single('avatar'), userValidator.avatar, userController.uploadAvatar)

module.exports = router.routes()
