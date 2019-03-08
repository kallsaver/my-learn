const fs = require('fs');
const path = require('path');
const Router = require('koa-router');

const router = new Router()

module.exports = (app) => {
  router.get('/upload', async (ctx, next) => {
    await ctx.render('upload', {
      title: '图片上传'
    })
  })

  router.post('/api/base64', async (ctx, next) => {
    ctx.status = 200
    let postData = ctx.request.body
    // 去掉图片base64码前面部分data:image/png;base64
    let base64 = postData.base64.replace(/^data:image\/\w+;base64,/, '');
    // 把base64码转成buffer对象
    let dataBuffer = new Buffer(base64, 'base64')
    let fileName = path.join(__dirname, './uploads/images/' + '1' + '.png')

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
