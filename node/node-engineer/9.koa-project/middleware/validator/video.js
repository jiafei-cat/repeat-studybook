const Joi = require('joi')
const mongoose = require('mongoose')
const { Video, VideoComment } = require('../../model')

module.exports = {
  async verifyVideoExists(ctx, next) {
    const { videoId } = ctx.params
    if (!mongoose.isValidObjectId(videoId)) {
      ctx.throw(400, '请输入正确的视频id')
    }

    const isExisted = await Video.findById(videoId)
    if (!isExisted) {
      ctx.throw(400, '视频不存在')
    }

    await next()
  },
  async verifyCommentExists(ctx, next) {
    const { commentId } = ctx.params

    if (!mongoose.isValidObjectId(commentId)) {
      ctx.throw(400, '请输入正确的评论id')
    }
    const isExisted = await VideoComment.findById(commentId)

    if (!isExisted) {
      ctx.throw(400, '评论不存在')
    }
    await next()
  },
  async createVideo(ctx, next) {
    const schema = Joi.object({
      title: Joi.string().min(5).max(30).required(),
      vodVideoId: Joi.string().required(),
    }).validate(ctx.request.body)

    if (schema.error) {
      ctx.throw(400, schema.error)
    }
    const { vodVideoId } = ctx.request.body

    const isExisted = await Video.findOne({ vodVideoId })
    if (!!isExisted) {
      ctx.throw(400, '视频已经存在')
    }

    await next()
  },
  async commentVideo(ctx, next) {
    const schema = Joi.object({
      content: Joi.string().required(),
    }).validate(ctx.request.body)

    if (schema.error) {
      ctx.throw(400, schema.error)
    }

    await next()
  },
}
