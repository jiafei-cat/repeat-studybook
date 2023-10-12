const mongoose = require('mongoose')
const baseModel = require('./baseModel')
const baseOptions = require('./baseOptions')

module.exports = new mongoose.Schema(
  {
    /** 关联的用户 */
    user: {
      type: mongoose.ObjectId,
      required: true,
      ref: 'User',
    },
    /** 关联的视频 */
    video: {
      type: mongoose.ObjectId,
      required: true,
      ref: 'Video',
    },
    /**
     * 是否喜欢
     * - 1 - 喜欢
     * - -1 - 不喜欢
     */
    type: {
      type: Number,
      enum: [1, -1],
      required: true,
    },
    ...baseModel,
  },
  baseOptions
)
