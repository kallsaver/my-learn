module.exports = () => {
  return async (ctx, next) => {
    ctx.set("Content-Type", "application/json")
    ctx.body = JSON.stringify(json)
    await next()
  }
}
