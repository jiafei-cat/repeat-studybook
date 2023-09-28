const { validationResult } = require('express-validator')

/**
 * 将验证中间件集中处理，通过 express-validator 的 validation.run执行校验 并一起校验参数
 * 最后通过 validationResult 获取校验结果来决定 next 还是 返回错误给客户端
 */
const errorBack = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)))

    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next()
    }

    res.status(400).json({ errors: errors.array() })
  }
}

module.exports = errorBack
