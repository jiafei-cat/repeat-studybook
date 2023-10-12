const jwt = require('jsonwebtoken')
const util = require('node:util')
const { jwtPrivateKey } = require('../config')

const sign = util.promisify(jwt.sign) // 默认为HMAC SHA256加密
const verify = util.promisify(jwt.verify)
let pre = null
module.exports = {
  /**
   * 创建json-web-token
   * @param {*} userinfo sign数据
   */
  createToken: async (userinfo) => {
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
  verifyToken:
    (required = true) =>
    async (ctx, next) => {
      const {
        headers: { authorization },
      } = ctx

      /** 不需要校验token并且请求没有携带token */
      if (!required && !authorization) {
        await next()
        return
      }

      if (!authorization) {
        ctx.throw(402, '没有权限访问该接口')
        return
      }

      const token = authorization.replace('Bearer ', '')

      try {
        /** 校验token */
        const isVerify = await verify(token, jwtPrivateKey)
        /** 将验证过的token携带的用户信息放入request中，方便下一个中间件使用 */
        ctx.userinfo = isVerify
      } catch (error) {
        ctx.throw(402, '无效的token')
      }

      await next()
    },
}
