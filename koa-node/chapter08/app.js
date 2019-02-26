const path = require('path')
const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const static = require('koa-static')
const views = require('koa-views')
const Router = require('koa-router')

const app = new Koa()
const router = new Router()

// 模板引擎
app.use(views(__dirname + '/views'), {

})

// 静态资源
app.use(static(path.join(__dirname, '/static')))

router.get('/', async (ctx, next) => {
  // ctx.render记得把await带上
  await ctx.render('index')
})

router.get('/user', async (ctx, next) => {
  // ctx.render记得把await带上
  ctx.body = '<div>user</div>'
})

router.post('/', async (ctx, next) => {
  let postData = ctx.request.body
  ctx.body = postData
})

app.use(bodyParser())
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(3000, () => {
  console.log('server is running at http://localhost:3000')
})
