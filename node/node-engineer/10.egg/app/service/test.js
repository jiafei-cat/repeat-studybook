const Service = require('egg').Service

class Test extends Service {
  test() {
    this.logger.info('[test] test')
    return 'test from service'
  }
}

module.exports = Test
