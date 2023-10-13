const Joi = require('joi')

module.exports = {
  /**
   * 分页参数校验
   */
  async pageSizeParams(ctx, next) {
    const schema = Joi.object({
      pageSize: Joi.number().min(1).max(999),
      pageNum: Joi.number().min(1).max(999),
    }).validate(ctx.request.body)

    if (schema.error) {
      ctx.throw(400, schema.error)
    }

    await next()
  },
}
