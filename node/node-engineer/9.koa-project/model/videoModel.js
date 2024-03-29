const mongoose = require('mongoose')
const baseModel = require('./baseModel')
const baseOptions = require('./baseOptions')

/**
 * 视频数据模型
 */
const userSchema = new mongoose.Schema(
  {
    /** 视频标题 */
    title: {
      type: String,
      required: true,
    },
    /** 视频描述 */
    description: {
      type: String,
      required: false,
    },
    /** 存储是VOD的视频id */
    vodVideoId: {
      type: String,
      required: true,
    },
    /** 视频管理用户id */
    user: {
      type: mongoose.ObjectId,
      required: true,
      ref: 'User',
    },
    /** 视频封面 */
    videoCover: {
      type: String,
      required: false,
    },
    /** 视频评论数量 */
    commentCount: {
      type: Number,
      required: true,
      default: 0,
    },
    ...baseModel,
  },
  baseOptions
)

module.exports = userSchema
