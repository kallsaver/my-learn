const bodyParser = require('./bodyparser')
const staticFileMiddleware = require('./static')
const nunjucksMiddleware = require('./nunjucks')
const test = require('./test')

module.exports = (app) => {
  app.use(test())
  app.use(nunjucksMiddleware())
  app.use(staticFileMiddleware())
  app.use(bodyParser())
}

