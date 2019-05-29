const fs = require('fs')
const path = require('path')
const Router = require('koa-router')
const uuid = require('node-uuid')

const fsTools = require('./helpers/fs-tools')
let formatDate = require('./helpers/format-date')

const router = new Router()

module.exports = (app) => {
  app.use(async (ctx, next) => {
    console.log('Allow-Origin start')
    ctx.set('Access-Control-Allow-Origin', '*')
    // if (ctx.method == 'OPTIONS') {
    //   ctx.body = 200
    // } else {
    //   await next()
    // }
    await next()
    console.log('Allow-Origin end')
  })
  router.get('/upload', async (ctx, next) => {
    console.log('router upload start')
    await ctx.render('upload', {
      title: '图片上传'
    })
    console.log('router upload end')
  })

  router.get('/api/getImage', async (ctx, next) => {

  })

  router.post('/api/base64', async (ctx, next) => {
    ctx.status = 200
    let postData = ctx.request.body

    if (!postData.base64) {
      ctx.body = {
        code: 0,
        msg: '缺少base64参数'
      }
    }

    if (!postData.name) {
      ctx.body = {
        code: 0,
        msg: '缺少name参数'
      }
    }

    // 提取base的数据码
    let base64Data = postData.base64.replace(/^data:.*?\/.*?base64/, '')

    let name = postData.name

    // 把base64的数据码转成buffer对象
    let dataBuffer = Buffer.from(base64Data, 'base64')
    let uuidName = uuid(new Date().getTime() + '')
    let fileName = path.join(__dirname, `./uploads/${name}`)

    fsTools.checkFileSync(fileName)

    // fs.writeFileSyn创建文件时如果没有上层文件夹存在,则会创建失败
    fsTools.writeFileSync(fileName, dataBuffer, {
      encoding: 'utf8'
    }).then((res) => {
      ctx.body = {
        code: 1,
        msg: '写入图片成功'
      }
    }).catch((res) => {
      ctx.body = {
        code: 1,
        msg: '写入图片失败'
      }
    })
  })

  app.use(router.routes()).use(router.allowedMethods())
}
