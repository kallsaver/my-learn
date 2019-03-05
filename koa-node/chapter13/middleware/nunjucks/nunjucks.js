module.exports = (ctx, next) => {
  console.log('static')
  nunjucks({
    ext: 'html',
    path: path.join(__dirname, '../../views'),
    nunjucksConfig: {
      // 从块/标签自动删除尾随换行符
      trimBlocks: true
    }
  })
}
