const bodyParser = require('koa-bodyparser')

module.exports = () => {
  return bodyParser({
    jsonLimit: '50mb'
  })
}
