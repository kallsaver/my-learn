const Koa = require('koa')
const app = new Koa()

const { HOST, PORT } = require('./config/index')

const middleware = require('./middleware/index')
const router = require('./router/index')

middleware(app)
router(app)

app.listen(PORT, () => {
  let url = HOST + PORT + '/upload'
  console.log(`server is running at ${url}`)
})
