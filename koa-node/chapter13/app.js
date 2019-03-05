const Koa = require('koa')
const app = new Koa()

const middleware = require('./middleware/index')
const router = require('./router')

middleware(app)
router(app)
app.listen(3000, () => {
  console.log('server is running at http://localhost:3000')
})
