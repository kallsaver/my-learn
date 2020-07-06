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
app.use(static(path.join(__dirname, 'static')))


router.get('/', async(ctx, next) => {
  await ctx.render('index')
  next()
})

router.get('/api/getName', async (ctx, next) => {
  ctx.response.status = 200
  let query = ctx.request.query
  if (query.type !== undefined) {
    ctx.body = {
      code: 1,
      msg: 'success',
      data: {
        name: 'a'
      }
    }
  } else {
    ctx.body = {
      code: 0,
      msg: 'error',
    }
  }
})

router.post('/api/login', async(ctx, next) => {
  ctx.response.status = 200
  // koa-bodyparser的处理
  let postData = ctx.request.body
  console.log(postData)
  if (postData.userName === 'dd') {
    ctx.body = {
      code: 1,
      msg: 'success',
      data: {
        count: 100
      }
    }
  } else {
    ctx.body = {
      code: 0,
      msg: 'error',
    }
  }

})

router.all('/*' ,async(ctx, next) => {
  console.log('all')
  ctx.set('Access-Control-Allow-Origin', '*')
  next()
})


app.use(bodyParser())
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(3000, () => {
  console.log('server is running at http://localhost:3000')
})
