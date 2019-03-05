const path = require('path')
const bodyParser = require('koa-bodyparser')
const staticFileMiddleware = require('./static/static')
const nunjucksMiddleware = require('./nunjucks/nunjucks')

// const multerMiddleWare = require('./multer/multer.js')

module.exports = (app) => {
  app.use(staticFileMiddleware)
  app.use(nunjucksMiddleware)
  app.use(bodyParser())
  // app.use(multerMiddleWare())
}
