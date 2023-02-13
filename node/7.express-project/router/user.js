const express = require('express')
const { jwt } = require('../utils')
const { userController } = require('../controller')
const { validationResult } = require('express-validator')
const userValidator = require('../middleware/validator/userValidator')

const router = express.Router()

router.get('/lists', jwt.verifyToken, userController.list)
router.post('/registers', userValidator.register, userController.register,)
router.post('/logins', userValidator.login, userController.login)

module.exports = router