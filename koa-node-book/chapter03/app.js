const Koa = require('koa')
const app = new Koa()

// 在新的命令面板上输入:
// curl -d "param1=value1&param2=value2" http://localhost:3000
// 或者打开postman

app.use(async (ctx, next) => {
  console.log(ctx.request.method)
  let postData = ''
  // post请求的参数获取方式
  ctx.req.on('data', (data) => {
    console.log(data)
    postData += data
  })
  ctx.req.on('end', () => {
    console.log(postData)
  })
})

app.listen(3000, () => {
  console.log('server is running at http://localhost:3000')
})
