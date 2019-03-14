const fs = require('fs')
const path = require('path')
const Router = require('koa-router')
const uuid = require('node-uuid')

const utils = require('./helpers/utils')
let formatDate = require('./helpers/format-date')

const router = new Router()

module.exports = (app) => {
  router.get('/upload', async (ctx, next) => {
    await ctx.render('upload', {
      title: '图片上传'
    })
  })

  router.get('/api/getImage', async (ctx, next) => {

  })

  router.post('/api/base64', async (ctx, next) => {
    ctx.status = 200
    let postData = ctx.request.body
    // 去掉图片base64码前面部分data:image/pngbase64
    let base64 = postData.base64.replace(/^data:image\/.*?;base64,/, '')
    let ext = postData.base64.replace(/^data:image\/(\w+)(\+.*)??;base64,.*/, '$1')
    // 把base64码转成buffer对象
    let dataBuffer = new Buffer(base64, 'base64')
    let uuidName = uuid(new Date().getTime() + '')
    let fileName = path.join(__dirname, './uploads/images/' +
      `${formatDate(new Date(), 'YYYY-MM-DD')}\\${uuidName}.${ext}`)

    utils.checkFileSync(fileName)

    // fs.writeFileSyn创建文件时如果没有上层文件夹存在,则会创建失败
    try {
      fs.writeFileSync(fileName, dataBuffer, {
        encoding: 'utf8'
      })

      ctx.body = {
        code: 1,
        msg: '写入图片成功'
      }

    } catch(err) {
      ctx.body = {
        code: 1,
        msg: '写入图片失败'
      }
    }
  })

  app.use(router.routes()).use(router.allowedMethods())
}
