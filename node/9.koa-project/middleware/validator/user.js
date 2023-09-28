const Joi = require('joi')

module.exports = {
  async register(ctx, next) {
    const schema = Joi.object({
      username: Joi.string().min(3).max(30).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(5).max(30).pattern(/\d/).message('Password must contain numbers').required(),
      phone: Joi.string().length(11).required(),
    }).validate(ctx.request.body)

    if (schema.error) {
      console.log(schema.error)
      ctx.throw(400, schema.error)
    }
  },
}
