const Router = require('koa-router')
const router = new Router()

module.exports = (app) => {
  router.get('/', async (ctx ,next) => {
    await ctx.render('index')
  })
  app.use(router.routes()).use(router.allowedMethods())
}
