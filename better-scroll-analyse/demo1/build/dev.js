const browserSync = require('browser-sync').create()
const portfinder = require('portfinder')
const { build } = require('./base')
const { resolve } = require('./utils')

;(async () => {
  await build()
  portfinder.basePort = 8888
  portfinder.getPort((err, port) => {
    if (err) {
      console.log(err)
    } else {
      browserSync.init({
        // 以ip地址的方式打开
        open: 'external',
        server: {
          // 服务器的根目录设置在项目根目录,这样项目的文件才能正确访问
          baseDir: resolve(''),
          index: 'examples/index.html'
        },
        port: port,
        notify: false,
        files: [
          {
            match: [resolve('src/**'), resolve('examples/**')],
            async fn() {
              await build()
              browserSync.reload()
            }
          }
        ]
      })
    }
  })
})()
