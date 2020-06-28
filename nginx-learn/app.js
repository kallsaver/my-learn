const Koa = require('koa2')
const Router = require('koa-router')

const app = new Koa()
const router = new Router()

let count = 0

router.get('/api/index', (ctx, next) => {
  // console.log(ctx.request)

  const data = {
    code: 1,
    data: count++,
  }
  ctx.body = data
})

app.use(router.routes())

app.listen(3000, () => {
  console.log('server is running at http://localhost:3000')
})
