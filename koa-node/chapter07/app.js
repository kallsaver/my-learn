const Koa = require('koa')
// 注意 require('koa-router') 返回的是函数:
const Router = require('koa-router')
const app = new Koa()

// 嵌套路由
const forums = new Router()
const posts = new Router()

posts.get('/', (ctx, next) => {
  ctx.response.body = '<div>posts index</div>'
})

posts.get('/:pid', (ctx, next) => {
  ctx.response.body = `<div>posts ${ctx.request.url}</div>`
})

forums.use('/forums/:fid/posts', posts.routes(), posts.allowedMethods())


app.listen(3000, () => {
  console.log('server is running at http://localhost:3000')
})
