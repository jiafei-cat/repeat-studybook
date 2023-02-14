const { md5, jwt } = require('../utils/index')
const { User } = require('../model')
const { jwtPrivateKey } = require('../config')

const commonResponse = (status, message, data = null) => ({
  code: status,
  mes: message,
  data
})

/**
 * 注册逻辑
 */
exports.register = async (req, res) => {
  const userParams = req.body

  const userModel = new User(req.body)
  const dbResult = await userModel.save()
  res.status(200).json(commonResponse(0, 'success', {
    userId: dbResult._id
  }))
}

/**
 * 获取用户列表逻辑
 */
exports.list = async (req, res) => {
  const allUser = await User.find({})
  res.status(200).send(allUser)
}

/**
 * 登录逻辑
 */
exports.login = async (req, res) => {
  const { email, password } = req.body
  const targetUser = await User.findOne({ email, password })
  if (!targetUser) {
    res.status(402).json(commonResponse(402, '邮箱不存在或者密码错误'))
    return
  }

  /** 登录成功生成token返回客户端 */
  const token = await jwt.createToken(targetUser.toJSON())

  res.status(200).json(commonResponse(0, '登录成功', {
    userId: targetUser._id,
    token,
  }))
}

/**
 * 更新用户数据
 */
exports.update = async (req, res, next) => {
  const updateData = await User.findByIdAndUpdate(req.userinfo._id, req.body, {
    /** 返回更新后的query */
    new: true
  }).lean()

  res.status(202).send(updateData)
}