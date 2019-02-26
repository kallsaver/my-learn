const Koa = require('koa')
// 注意 require('koa-router') 返回的是函数:
const Router = require('koa-router')
const app = new Koa()

const router = new Router()

// 添加路由
router.get('/', async (ctx, next) => {
  ctx.response.body = `<div>index page</div>`
})

router.get('/home', async (ctx, next) => {
  ctx.response.body = '<div>HOME page</div>'
})

router.get('/404', async (ctx, next) => {
  ctx.response.body = '<div>404 Not Found</div>'
})

// 一个路由对应多个中间件
router.get(
  '/users/:id',
  function (ctx, next) {
    ctx.user = { id: 17, name: "Alex" }
    next()
  },
  function (ctx) {
    console.log(ctx.user)
    ctx.response.body = `<div>${ctx.user.name}</div>`
  }
);

// 调用路由中间件
app.use(router.routes())

app.listen(3000, () => {
  console.log('server is running at http://localhost:3000')
})
