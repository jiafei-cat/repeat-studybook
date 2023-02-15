const path = require('node:path')
const express = require('express')
const multer  = require('multer')

const { jwt } = require('../utils')
const { userController } = require('../controller')
const { validationResult } = require('express-validator')
const userValidator = require('../middleware/validator/userValidator')

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/')
  },
  filename(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({ storage: storage });

const router = express.Router()

router.post('/registers', userValidator.register, userController.register)
router.post('/logins', userValidator.login, userController.login)

router.get('/lists', jwt.verifyToken(), userController.list)
router.put('/', jwt.verifyToken(), userValidator.update, userController.update)
router.post('/avatar', jwt.verifyToken(), upload.single('avatar'), userController.uploadAvatar)

router.post('/subscribe/:userId', jwt.verifyToken(), userController.subscribe)
router.post('/unsubscribe/:userId', jwt.verifyToken(), userController.unsubscribe)

module.exports = router