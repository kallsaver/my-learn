const bodyParser = require('koa-bodyparser')
const staticFileMiddleware = require('./static')
const nunjucksMiddleware = require('./nunjucks')
// const multerMiddleWare = require('./multer.js')

module.exports = (app) => {
  app.use(nunjucksMiddleware())
  app.use(staticFileMiddleware())
  app.use(bodyParser())
  // multerMiddleWare()
  // app.use(multerMiddleWare())
}

