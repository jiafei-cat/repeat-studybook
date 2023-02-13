const { body } = require('express-validator')
const errorBack = require('./errorBack')
const { User } = require('../../model/index')

module.exports = {
  register: errorBack([
    body('username')
      .notEmpty().withMessage('用户名不能为空').bail()
      .isLength({ min: 3 }).withMessage('用户名长度不能小于3').bail(),
    body('email')
      .notEmpty().withMessage('邮箱不能为空').bail()
      .isEmail().withMessage('请输入正确的邮箱地址').bail()
      .custom(async value => {
        const isExistedEmail = await User.findOne({ email: value })
        if (!!isExistedEmail) {
          return Promise.reject('邮箱已经被注册')
        }
      }).bail(),
    body('phone')
      .isMobilePhone().withMessage('请输入正确的手机号码').bail()
      .custom(async value => {
        const isExistedEmail = await User.findOne({ phone: value })
        if (!!isExistedEmail) {
          return Promise.reject('手机号码已经被注册')
        }
      }).bail(),
  ])
}