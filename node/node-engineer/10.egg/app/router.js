'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  app.test = '123'

  const { router, controller } = app
  router.get('/', controller.home.index)
  router.get('/test', controller.home.test)
}
