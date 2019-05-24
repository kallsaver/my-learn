const bodyParser = require('koa-bodyparser')
const staticFileMiddleware = require('./static')
const nunjucksMiddleware = require('./nunjucks')

module.exports = (app) => {
  app.use(nunjucksMiddleware())
  app.use(staticFileMiddleware())
  app.use(bodyParser())
}

