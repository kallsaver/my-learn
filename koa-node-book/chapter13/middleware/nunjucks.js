const nunjucks = require('koa-nunjucks-2')
const path = require('path')

module.exports = () => {
  return nunjucks({
    ext: 'html',
    path: path.join(__dirname, '../views'),
    nunjucksConfig: {
      // 从块/标签自动删除尾随换行符
      trimBlocks: true
    }
  })
}
