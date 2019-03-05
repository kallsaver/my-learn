const Koa = require('koa')
const app = new Koa()

// 开发第三方中间件其实是开发一个函数

app.use(function () {
  console.log('执行')
})

// 每收到一个 http 请求
// Koa都会调用通过app.use()注册的async函数
// 这个async函数就是我们所说的中间件

// 洋葱模型
// 请求: 中间件1 => 中间件2 => 中间件3 => 中间件4
// 响应: 中间件4 => 中间件3 => 中间件2 => 中间件1
app.use(async (ctx, next) => {
  let stime = new Date().getTime()
  await next()
  let etime = new Date().getTime()
  ctx.response.type = 'text/html'
  ctx.response.body = '<div>dd</div>'
  console.log(`请求地址: ${ctx.path}，响应时间：${etime - stime}ms`)
});

app.use(async (ctx, next) => {
  console.log('中间件1 doSomething')
  await next()
  console.log('中间件1 end')
})

app.use(async (ctx, next) => {
  console.log('中间件2 doSomething')
  // 把这里去掉,第四个中间件不会执行了
  await next()
  console.log('中间件2 end')
})

app.use(async (ctx, next) => {
  console.log('中间件3 doSomething')
  await next()
  console.log('中间件3 end')
})

app.listen(3000, () => {
  console.log('server is running at http://localhost:3000')
})
