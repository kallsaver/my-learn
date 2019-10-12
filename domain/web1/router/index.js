const fs = require('fs')
const path = require('path')
const Router = require('koa-router')

const router = new Router()

module.exports = (app) => {
  app.use(router.routes()).use(router.allowedMethods())
  app.use(async (ctx, next) => {
    console.log('Allow-Origin start')
    ctx.set('Access-Control-Allow-Origin', '*')
    await next()
    console.log('Allow-Origin end')
  })
  router.get('/upload', async (ctx, next) => {
    console.log('router upload start')
    await ctx.render('index/upload/upload', {
      title: '图片上传'
    })
    console.log('router upload end')
  })
}
