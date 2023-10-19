const Joi = require('joi')
const { User } = require('../../model')

module.exports = {
  async register(ctx, next) {
    const schema = Joi.object({
      username: Joi.string().min(3).max(30).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(5).max(30).pattern(/\d/).message('Password must contain numbers').required(),
      phone: Joi.string().length(11).required(),
    }).validate(ctx.request.body)

    if (schema.error) {
      ctx.throw(400, schema.error)
    }

    const { username, phone, email } = ctx.request.body
    const isExisted = await User.findOne({ $or: [{ username }, { phone }, { email }] })
    if (!!isExisted) {
      ctx.throw(400, '用户名/手机/邮箱之一已被使用')
    }

    await next()
  },

  async login(ctx, next) {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }).validate(ctx.request.body)
    if (schema.error) {
      ctx.throw(400, schema.error)
    }

    await next()
  },

  async update(ctx, next) {
    const schema = Joi.object({
      username: Joi.string().min(3).max(30),
      email: Joi.string().email(),
      password: Joi.string(),
      phone: Joi.string().length(11),
    }).validate(ctx.request.body)

    if (schema.error) {
      ctx.throw(400, schema.error)
    }

    const { username, phone, email } = ctx.request.body
    const curUserId = ctx.userinfo._id

    /** 修改时判断当前登录用户id是否与重名id相同，相同则通过校验 */
    const isExisted = await User.findOne({ $or: [{ username }, { phone }, { email }] })

    if (!!isExisted && isExisted._id.toString() !== ctx.userinfo._id) {
      ctx.throw(400, '用户名/手机号/邮箱有一项已经被他人注册了')
    }

    await next()
  },

  async avatar(ctx, next) {
    if (!ctx.file) {
      ctx.throw(400, '请上传正确的头像文件')
    }
    await next()
  },
}
