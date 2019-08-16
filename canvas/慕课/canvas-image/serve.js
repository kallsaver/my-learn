const path = require('path')
const browserSync = require('browser-sync').create()

browserSync.init({
  server: {
    // 服务器的根目录设置在项目根目录,这样项目的文件才能正确访问
    baseDir: './',
    index: '5获取图像像素.html'
  },
  port: 3001,
  notify: false,
  files: [
    {
      match: [path.resolve(__dirname, './')],
      fn: () => {
        browserSync.reload()
      }
    }
  ]
})
