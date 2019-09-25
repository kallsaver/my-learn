const Koa = require('koa')
const app = new Koa()

const middleware = require('./middleware/index')
const router = require('./router')

const HOST = 'http://localhost:'
const PORT = 3002

middleware(app)
router(app)

app.listen(PORT, () => {
  let url = HOST + PORT + '/upload'
  console.log(`server is running at ${url}`)
})
