'use strict'

const { Controller } = require('egg')

class HomeController extends Controller {
  async index() {
    const { ctx } = this
    ctx.body = 'hi, egg'
  }
  test() {
    /**
     * this 可以直接获取service/app/ctx/config/logger
     */
    const { ctx, app } = this
    const dataFromService = this.service.test.test()
    ctx.body = `${app.test} ${dataFromService}`
  }
}

module.exports = HomeController
