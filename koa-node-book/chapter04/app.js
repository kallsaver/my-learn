const Koa = require('koa')
const app = new Koa()
const bodyParser = require('koa-bodyparser')

app.use(bodyParser())

app.use(async (ctx) => {
  if (ctx.url === '/' && ctx.method === 'GET') {
    ctx.type = 'html'
    let html = `
      <h1></h1>
      <form method="POST" action="/">
        <p>用户名</p>
        <input name="userName" />
        <p>密码</p>
        <input name="password" type="password">
        <button type="sumbit">sumbit</button>
      </form>
    `
    ctx.body = html
  } else if (ctx.url === '/' && ctx.method === 'POST') {
    // 中间件koa-bodyparser解析POST表单里的数据是json对象
    let postData = ctx.request.body
    ctx.body = postData
  }
})

app.listen(3000, () => {
  console.log('server is running at http://localhost:3000')
})

