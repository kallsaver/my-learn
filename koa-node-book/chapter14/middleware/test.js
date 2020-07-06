module.exports = function () {
  return async (ctx, next) => {
    console.log('test start')
    await next()
    console.log('test end')
  }
}
