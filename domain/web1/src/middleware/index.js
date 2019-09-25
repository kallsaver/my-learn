const bodyParser = require('./bodyparser')
const staticMiddleware = require('./static')
const nunjucksMiddleware = require('./nunjucks')

module.exports = (app) => {
  app.use(nunjucksMiddleware())
  app.use(staticMiddleware())
  app.use(bodyParser())
}
