const express = require('express')
const { userController } = require('../controller')
const { validationResult } = require('express-validator')
const userValidator = require('../middleware/validator/userValidator')

const router = express.Router()

router.get('/list', userController.list)
router.post(
  '/register',
  ...userValidator.register,
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(401).send({
        error: errors.array()
      })
    }
    next()
  },
  userController.register
)

module.exports = router