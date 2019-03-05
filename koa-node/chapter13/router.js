const fs = require('fs');
const path = require('path');
const Router = require('koa-router');
const multer = require('koa-multer');

const router = new Router()

const upload = multer({
  // 指定上传文件的存储目录
  dest: 'uploads/images'
});

const types = upload.single('avatar');

module.exports = (app) => {
  router.get('/upload', async (ctx, next) => {
    await ctx.render('upload', {
      title: '图片上传'
    })
  })

  router.post('/api/upload', types, async function cb(ctx, next) {
    let file = ctx.req.file
    let originalname = file.originalname
    let out_path = file.path
    console.log(ctx.req.file)

    // let ext = path.parse(originalname).ext
    // let newName = out_path + ext
    // let err = fs.renameSync(out_path, newName)
    // let result
    // if (err) {
    //   result = JSON.stringify(err)
    // } else {
    //   result = '<h1>upload success</h1>'
    // }
    ctx.response.status = 200
    ctx.response.body = result
  })

  app.use(router.routes()).use(router.allowedMethods())
}
