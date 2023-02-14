const { body } = require('express-validator')
const errorBack = require('./errorBack')
const { User } = require('../../model')

module.exports = {
  /**
   * 注册参数校验规则
   */
  register: errorBack([
    body('username')
      .notEmpty().withMessage('用户名不能为空').bail()
      .isLength({ min: 3 }).withMessage('用户名长度不能小于3').bail()
      .custom(async value => {
        const isExisted = await User.findOne({ username: value })
        if (!!isExisted) {
          return Promise.reject('用户名已被使用')
        }
      }).bail(),
    body('email')
      .notEmpty().withMessage('邮箱不能为空').bail()
      .isEmail().withMessage('请输入正确的邮箱地址').bail()
      .custom(async value => {
        const isExisted = await User.findOne({ email: value })
        if (!!isExisted) {
          return Promise.reject('邮箱已经被注册')
        }
      }).bail(),
    body('password')
      .notEmpty().withMessage('密码不能为空').bail()
      .isLength({ min: 5 }).withMessage('密码必须大于5位数').bail()
      .matches(/\d/).withMessage('密码必须包含数字').bail(),
    body('phone')
      .isMobilePhone().withMessage('请输入正确的手机号码').bail()
      .custom(async value => {
        const isExisted = await User.findOne({ phone: value })
        if (!!isExisted) {
          return Promise.reject('手机号码已经被注册')
        }
      }).bail(),
  ]),
  /**
   * 登录参数校验规则
   */
  login: errorBack([
    body('email')
      .notEmpty().withMessage('邮箱不能为空').bail()
      .isEmail().withMessage('请输入正确的邮箱地址').bail(),
    body('password')
      .notEmpty().withMessage('密码不能为空').bail()
  ]),
  /**
   * 更新用户信息
   */
  update: errorBack([
    body('email')
      .optional()
      .notEmpty().withMessage('邮箱不能为空').bail()
      .isEmail().withMessage('请输入正确的邮箱地址').bail()
      .custom(async (value, { req }) => {
        const isExisted = await User.findOne({ email: value })
        /** 修改时判断当前登录用户id是否与重名id相同，相同则通过校验 */
        if (!!isExisted && isExisted._id.toString() !== req.userinfo._id) {
          return Promise.reject('邮箱已经被注册')
        }
      }).bail(),
    body('username')
      .optional()
      .notEmpty().withMessage('邮箱不能为空').bail()
      .isLength({ min: 3 }).withMessage('用户名长度不能小于3').bail()
      .custom(async (value, { req }) => {
        const isExisted = await User.findOne({ username: value })
        if (!!isExisted && isExisted._id.toString() !== req.userinfo._id) {
          return Promise.reject('用户名已被使用')
        }
      }).bail(),
    body('phone')
      .optional()
      .notEmpty().withMessage('手机号码不能为空').bail()
      .isMobilePhone().withMessage('请输入正确的手机号码').bail()
      .custom(async (value, { req }) => {
        const isExisted = await User.findOne({ phone: value })
        if (!!isExisted && isExisted._id.toString() !== req.userinfo._id) {
          return Promise.reject('手机号码已经被注册')
        }
      }).bail(),
  ]),
  
}