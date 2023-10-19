const mongoose = require('mongoose')
const { body, param } = require('express-validator')
const errorBack = require('./errorBack')
const { Video, VideoComment } = require('../../model')

module.exports = {
  /**
   * 创建视频校验
   */
  createVideo: errorBack([
    body('title')
      .notEmpty().withMessage('视频标题不能为空').bail()
      .isLength({ min: 5, max: 30 }).withMessage('视频标题不能小于5个字符且不能大于30个字符').bail(),
    body('vodVideoId')
      .notEmpty().withMessage('视频id不能为空').bail()
      .custom(async (value) => {
        const isExisted = await Video.findOne({ vodVideoId: value })
        if (!!isExisted) {
          return Promise.reject('视频已经存在')
        }
      }).bail(),
  ]),
  /**
   * 视频评论
   */
  commentVideo: errorBack([
    body('content')
      .notEmpty().withMessage('视频评论不能为空').bail()
  ]),
  /**
   * 验证视频是否存在
   */
  verifyVideoExists: errorBack([
    param('videoId')
      .custom(async value => {
        if (!mongoose.isValidObjectId(value)) {
          return Promise.reject('请输入正确的视频id')
        }
        const isExisted = await Video.findById(value)

        if (!isExisted) {
          return Promise.reject('视频不存在')
        }

      }).bail(),
  ]),
  /**
   * 验证评论是否存在
   */
  verifyCommentExists: errorBack([
    param('commentId')
      .custom(async value => {
        if (!mongoose.isValidObjectId(value)) {
          return Promise.reject('请输入正确的评论id')
        }
        const isExisted = await VideoComment.findById(value)

        if (!isExisted) {
          return Promise.reject('评论不存在')
        }

      }).bail(),
  ]),
}