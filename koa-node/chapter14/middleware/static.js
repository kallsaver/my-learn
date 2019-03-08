const staticFiles = require('koa-static')
const path = require('path')

module.exports = () => {
  return staticFiles(path.resolve(__dirname, '../public'), {
    // 浏览器缓存时间,默认是0
    maxage: 30 * 24 * 60 * 60 * 1000
  })
}

