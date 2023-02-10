const express = require('express')
const { userController } = require('../controller')

const router = express.Router()

router.get('/list', userController.list)
router.post('/register', userController.register)

module.exports = router