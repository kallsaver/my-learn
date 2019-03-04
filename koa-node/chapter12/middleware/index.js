const path = require('path')
const bodyParser = require('koa-bodyparser')
const nunjucks = require('koa-nunjucks-2')
const staticFiles = require('koa-static')
const koaJson = require('./modules/koa-json')

module.exports = (app) => {
  app.use(staticFiles(path.resolve(__dirname, '../public'), {
    // 浏览器缓存时间,默认是0
    maxage: 30 * 24 * 60 * 60 * 1000
  }))
  app.use(nunjucks({
    ext: 'html',
    path: path.join(__dirname, '../views'),
    nunjucksConfig: {
      // 从块/标签自动删除尾随换行符
      trimBlocks: true
    }
  }))
  app.use(bodyParser())
  app.use(koaJson())
}

