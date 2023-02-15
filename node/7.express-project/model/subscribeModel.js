const mongoose = require('mongoose')
const baseModel = require('./baseModel')

/** 用户订阅模型 (关联表) */
module.exports = new mongoose.Schema({
  /** 用户 */
  user: {
    type: mongoose.ObjectId,
    required: true,
    ref: 'User',
  },
  /** 用户订阅的用户频道 */
  channel: {
    type: mongoose.ObjectId,
    require: true,
    ref: 'User',
  },
  ...baseModel
})