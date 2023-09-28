const Router = require('@koa/router')
const userValidator = require('../middleware/validator/user')
const router = new Router()

router.post('/registers', userValidator.register)

module.exports = router.routes()
