const mongoose = require('mongoose')
const { body, param } = require('express-validator')
const errorBack = require('./errorBack')
const { Video } = require('../../model')

module.exports = {
  /**
   * 分页参数校验
   */
  pageSizeParams: errorBack([
    body('pageSize')
      .optional()
      .matches(/\d/).withMessage('请传入数字').bail()
      .isFloat({ min: 1, max: 999 }).withMessage('分页大小在1~999之间').bail(),
    body('pageNum')
      .optional()
      .matches(/\d/).withMessage('请传入数字').bail()
      .isFloat({ min: 1, max: 999 }).withMessage('分页大小在1~999之间').bail(),
  ]),
}