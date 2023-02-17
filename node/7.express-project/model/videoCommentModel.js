const mongoose = require('mongoose')
const baseModel = require('./baseModel')

const videoCommentSchema = new mongoose.Schema({
  /** 评论内容 */
  content: {
    type: String,
    required: true,
  },
  /** 评论用户 */
  user: {
    type: mongoose.ObjectId,
    required: true,
    ref: 'User',
  },
  /** 评论的视频 */
  video: {
    type: mongoose.ObjectId,
    required: true,
    ref: 'Video',
  },
  ...baseModel,
})

module.exports = videoCommentSchema