const jwt = require('jsonwebtoken')
const util = require('node:util')
const { jwtPrivateKey } = require('../config')

const sign = util.promisify(jwt.sign) // 默认为HMAC SHA256加密
const verify = util.promisify(jwt.verify)

module.exports = {
  /**
   * 创建json-web-token
   * @param {*} userinfo sign数据
   */
  createToken: async userinfo => {
    return await sign(userinfo, jwtPrivateKey, {
      /** 过期时间获取 - 单位为秒 */
      expiresIn: 60 * 60 * 24,
    })
  },
  /**
   * 校验json-web-token
   * @param {*} required 是否需要校验
   * @returns 
   */
  verifyToken: (required = true) => async (req, res, next) => {
    const { headers: { authorization } } = req
    if (!required && !authorization) {
      next()
      return
    }

    if (!authorization) {
      res.status('402').json({ mes: '没有权限访问该接口' })
      return
    }

    const token = authorization.replace('Bearer ', '')

    try {
      /** 校验token */
      const isVerify = await verify(token, jwtPrivateKey)
      /** 将验证过的token携带的用户信息放入request中，方便下一个中间件使用 */
      req.userinfo = isVerify
      next()
    } catch (error) {
      res.status('402').json({ mes: '无效的token' })
    }
  }
}