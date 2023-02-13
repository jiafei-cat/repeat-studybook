const jwt = require('jsonwebtoken')
const util = require('node:util')
const { jwtPrivateKey } = require('../config')

const sign = util.promisify(jwt.sign)
const verify = util.promisify(jwt.verify)

module.exports = {
  createToken: async userinfo => {
    return await sign(userinfo, jwtPrivateKey, {
      expiresIn: 60 * 60,
    })
  },
  verifyToken: async (req, res, next) => {
    const { headers: { authorization } } = req

    if (!authorization) {
      res.status('402').json({ mes: '没有权限访问该接口' })
      return
    }

    const token = authorization.replace('Bearer ', '')
    try {
      const isVerify = await verify(token, jwtPrivateKey)
      console.log('isVerify')
      console.log(isVerify)
      next()
    } catch (error) {
      res.status('402').json({ mes: '无效的token' })
    }
  }
}