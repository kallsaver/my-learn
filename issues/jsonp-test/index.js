const Koa = require('koa2')
const Router = require('koa-router')
const nunjucks = require('koa-nunjucks-2')
const path = require('path')

const app = new Koa()
const router = new Router()

app.use(nunjucks({
  ext: 'html',
  path: path.join(__dirname, 'views'),
  nunjucksConfig: {
    trimBlocks: true
  }
}))

router.get('/jsonp', (ctx, next) => {
  const callback = ctx.query.callback
  const data = {
    code: 1
  }
  // 返回的是自执行函数
  ctx.body = `${callback}(${JSON.stringify(data)})`
})

router.get('/index', async (ctx, next) => {
  await ctx.render('index', {
    title: 'jsonp'
  })
})

app.use(router.routes())

app.listen(3000, () => {
  console.log('server is running at http://localhost:3000')
})
