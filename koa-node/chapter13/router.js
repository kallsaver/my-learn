const fs = require('fs');
const path = require('path');
const Router = require('koa-router');
const multer = require('koa-multer');

const router = new Router()

const upload = multer({
  // 指定上传文件的存储目录
  dest: 'uploads/images'
});

// 和input的name一致
const types = upload.single('image');

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
    let ext = path.parse(originalname).ext
    let newName = out_path + ext
    let err = fs.renameSync(out_path, newName)
    if (err) {
      ctx.response.status = 200
      ctx.response.body = {
        code: 0,
        msg: 'File uploaded failed',
      }
    } else {
      ctx.response.status = 200
      ctx.response.body = {
        code: 1,
        msg: 'File uploaded successfully',
        filename: newName
      }
    }

    // console.log(ctx.req.file)
    // var des_file = __dirname + "/" + ctx.req.file.originalname;
    // fs.readFile(ctx.req.file.path, function (err, data) {
    //   fs.writeFile(des_file, data, function (err) {
    //     if (err) {
    //       console.log(err);
    //     } else {
    //       response = {
    //         message: 'File uploaded successfully',
    //         filename: ctx.req.file.originalname
    //       };
    //       ctx.response.status = 200
    //       ctx.response.body = response
    //     }
    //   });
    // });
  })

  app.use(router.routes()).use(router.allowedMethods())
}
