const express = require('express')
const { jwt } = require('../utils')
const { userController } = require('../controller')
const { validationResult } = require('express-validator')
const userValidator = require('../middleware/validator/userValidator')

const router = express.Router()

router.post('/registers', userValidator.register, userController.register)
router.post('/logins', userValidator.login, userController.login)

router.get('/lists', jwt.verifyToken, userController.list)
router.put('/', jwt.verifyToken, userValidator.update, userController.update)

module.exports = router