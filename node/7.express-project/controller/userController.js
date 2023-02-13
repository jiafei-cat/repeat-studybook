const { md5, jwt } = require('../utils/index')
const { User } = require('../model')
const { jwtPrivateKey } = require('../config')

const commonResponse = (status, message, data = null) => ({
  code: status,
  mes: message,
  data
})

exports.register = async (req, res) => {
  const userParams = req.body

  const userModel = new User(req.body)
  const dbResult = await userModel.save()
  res.status(200).json(commonResponse(0, 'success', {
    userId: dbResult._id
  }))
}

exports.list = async (req, res) => {
  console.log(req)
  res.send('/user/list')
}

exports.login = async (req, res) => {
  const { email, password } = req.body
  const targetUser = await User.findOne({ email })

  if (!targetUser || targetUser.password !== md5(password)) {
    res.status(402).json(commonResponse(402, '邮箱不存在或者密码错误'))
    return
  }

  const token = await jwt.createToken(targetUser.toJSON())

  res.status(200).json(commonResponse(0, '登录成功', {
    userId: targetUser._id,
    token,
  }))
}