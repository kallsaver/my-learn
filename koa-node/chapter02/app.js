const Koa = require('koa')
const app = new Koa()

// 输入地址http://localhost:3000?search=koa&keywords=context

app.use(async (ctx, next) => {
  // koa的request和node原生的request
  console.log(ctx.request === ctx.req)
  // koa的response和node原生的response
  console.log(ctx.response === ctx.res)
  await next()
  ctx.response.type = 'text/html'
  ctx.response.body = {
    url: ctx.request.url,
    query: ctx.request.query,
    querystring: ctx.request.querystring
  }
})

app.listen(3000, () => {
  console.log('server is running at http://localhost:3000')
})
