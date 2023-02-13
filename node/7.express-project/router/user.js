const express = require('express')
const { userController } = require('../controller')
const { validationResult } = require('express-validator')
const userValidator = require('../middleware/validator/userValidator')

const router = express.Router()

router.get('/list', userController.list)
router.post(
  '/register',
  userValidator.register,
  userController.register,
)

module.exports = router