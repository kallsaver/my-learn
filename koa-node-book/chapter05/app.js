const Koa = require('koa')
const app = new Koa()

app.use(async (ctx, next) => {
  // 设置请求的状态码为200
  ctx.response.status = 200
  // 判断客户端期望的数据类型
  if (ctx.request.accepts('json')) {
    ctx.response.type = 'json'
    ctx.response.body = {
      data: 'dd'
    }
  } else if (ctx.request.accepts('html')) {
    ctx.response.type = 'html'
    ctx.response.body = '<div>dd</div>'
  } else {
    ctx.response.type = 'text'
    ctx.response.body = dd
  }
  ctx.cookies.set('koa', 'dd', {
    maxAge: new Date().getTime + 10 * 60 * 60 * 1000,
    // httpOnly: true
  })
})

app.listen(3000, () => {
  console.log('server is running at http://localhost:3000')
})
