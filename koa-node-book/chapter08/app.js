const path = require('path')
const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const static = require('koa-static')
const views = require('koa-views')
const Router = require('koa-router')

const app = new Koa()
const router = new Router()

// 模板引擎
app.use(views(path.join(__dirname + '/views')), {
})

// 静态资源
app.use(static(path.join(__dirname, '/static')))


router.get('/', async (ctx, next) => {
  await ctx.render('index')
})

router.all('/*', async (ctx, next) => {
  console.log('all')
  ctx.set("Access-Control-Allow-Origin", "*")
})


app.use(bodyParser())
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(3000, () => {
  console.log('server is running at http://localhost:3000')
})
