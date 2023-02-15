const mongoose = require('mongoose')
const { md5, jwt } = require('../utils/index')
const { User, Subscribe } = require('../model')
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

/**
 * 上传用户头像
 */
exports.uploadAvatar = async (req, res, next) => {
  console.log(req.file)
  res.send({ imgUrl: req.file.path })
}

/**
 * 用户订阅
 */
exports.subscribe = async (req, res, next) => {
  const { userId } = req.params
  const { _id } = req.userinfo

  /** 校验传入的userId是否是正确的objectId */
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(402).send({ mes: '无效的频道' })
    return
  }

  if (userId === _id) {
    res.status(402).send({ mes: '自己无法关注自己' })
    return
  }

  const targetSubscribe = await Subscribe.find({
    channel: userId,
    user: _id,
  })

  /** 没有找到用户订阅频道, 则新建一条用户订阅集合 */
  if (!targetSubscribe || !targetSubscribe.length) {
    const subscribeModel = new Subscribe({
      channel: userId,
      user: _id,
    })
    const targetChannel = await User.findById(userId)
    await subscribeModel.save()
    targetChannel.subscribeCount++ // 关注成功，用户的被关注数+1
    await targetChannel.save()

    res.send({ mes: '关注成功' })
    return
  }
  
  res.send({ mes: '您已经关注过该频道' })
}

/**
 * 用户取消订阅
 */
exports.unsubscribe = async (req, res, next) => {
  const { userId } = req.params
  const { _id } = req.userinfo

  /** 校验传入的userId是否是正确的objectId */
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(402).send({ mes: '无效的频道' })
    return
  }

  const targetSubscribe = await Subscribe.findOne({
    channel: userId,
    user: _id,
  })

  if (!targetSubscribe) {
    res.send({ mes: '您当前并没有订阅该频道' })
    return
  }

  await targetSubscribe.remove() // 删除目标文档

  const targetChannel = await User.findById(userId)

  targetChannel.subscribeCount--
  await targetChannel.save()

  res.send({ mes: '取消订阅成功' })
}