const static = require('koa-static')
const path = require('path')

const { resolve } = require('../helpers/utils')

module.exports = () => {
  // return static(resolve('public'), {
  //   // 浏览器缓存时间,默认是0
  //   maxage: 30 * 24 * 60 * 60 * 1000
  // })
  return static(path.resolve(__dirname, '../public'), {
    // 浏览器缓存时间,默认是0
    maxage: 30 * 24 * 60 * 60 * 1000
  })
}
