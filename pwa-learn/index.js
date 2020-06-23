const path = require('path')

const Koa = require('koa2')
const Router = require('koa-router')
const nunjucks = require('koa-nunjucks-2')
const staticFiles = require('koa-static')

const app = new Koa()
const router = new Router()

app.use(nunjucks({
  ext: 'html',
  path: path.join(__dirname, 'views'),
  nunjucksConfig: {
    trimBlocks: true
  }
}))

app.use(staticFiles(path.resolve(__dirname, 'public'), {
  maxage: 0
}))

router.get('/', async (ctx, next) => {
  ctx.redirect('/index')
})

router.get('/index', async (ctx, next) => {
  ctx.render('index', {
    title: 'index'
  })
})

let count = 0

router.get('/api/index', (ctx, next) => {
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
