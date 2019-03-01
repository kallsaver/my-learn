const path = require('path')
const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const static = require('koa-static')
const views = require('koa-views')
const Router = require('koa-router')
const { sign } = require('jsonwebtoken')

// 设置密匙
const secret = 'demo'
const jwt = require('koa-jwt')({secret})

const app = new Koa()
const router = new Router()

// 模板引擎
app.use(views(path.join(__dirname + '/views')), {
})

// 静态资源
app.use(static(path.join(__dirname, 'static')))


router.get('/', async(ctx, next) => {
  await ctx.render('index')
  next()
})

router.post('/api/login', async(ctx, next) => {
  ctx.response.status = 200
  // koa-bodyparser的处理
  let user = ctx.request.body
  if (user && user.userName) {
    let payload = {
      username: user.userName
    }
    // 生成token
    const token = sign(
      payload,
      secret,
      {
        // 以秒表示或描述时间跨度
        expiresIn: 3
      }
    )

    ctx.body = {
      code: 1,
      msg: 'success',
      token: token
    }
  }
})

// 管理员中间件
const admin = (() => {
  return async (ctx, next) => {
    // console.log(ctx.request)
    next()
  }
})()


router.get('/api/userInfo', jwt, async (ctx, next) => {
  ctx.response.status = 200
  // let query = ctx.request.query
  // console.log(ctx.request)
  ctx.body = {
    code: 1,
    msg: 'success',
    data: {
      name: 'a'
    }
  }
})

router.all('/*' ,async(ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*')
  next()
})


app.use(bodyParser())
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(3000, () => {
  console.log('server is running at http://localhost:3000')
})
