const mongoose = require('mongoose')
const baseModel = require('./baseModel')
const { md5 } = require('../utils')

/**
 * 用户数据模型
 */
const userSchema = new mongoose.Schema({
  /** 用户名 */
  username: {
    type: String,
    required: true
  },
  /** 用户密码 */
  password: {
    type: String,
    required: true,
    /** 密码经过md5加密 */
    set: value => md5(value),
    /** 查询时不返回该字段 */
    select: false
  },
  /** 用户邮箱 */
  email: {
    type: String,
    required: false
  },
  /** 用户手机 */
  phone: {
    type: String,
    required: false
  },
  /** 用户头像 */
  avatar: {
    type: String,
    required: true,
    /** 为空时默认值 */
    default: () => `https://i.pravatar.cc/300?img=${~~((Math.random() * 500) + 1)}`
  },
  /** 频道封面 */
  channelCover: {
    type: String,
    default: null
  },
  /** 频道描述 */
  channelDescription: {
    type: String,
    default: null
  },
  ...baseModel,
})

module.exports = userSchema