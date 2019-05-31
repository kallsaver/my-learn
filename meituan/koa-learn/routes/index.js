const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  ctx.cookies.set('pvid', 6)
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  await (() => {
    ctx.body = 'koa2 string'
  })()
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json',
    cookies: ctx.cookies.get('pvid')
  }
})

module.exports = router
