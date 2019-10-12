const nunjucks = require('koa-nunjucks-2')
const path = require('path')

const { resolve } = require('../helpers/utils')

module.exports = () => {
  return nunjucks({
    ext: 'html',
    // path: resolve('views'),
    path: path.join(__dirname, '../views'),
    nunjucksConfig: {
      // 从块/标签自动删除尾随换行符
      trimBlocks: true
    }
  })
}
