const gulp = require('gulp')
const browserSync = require('browser-sync').create()
const plumber = require('gulp-plumber')
const nodemon = require('gulp-nodemon')
const merge = require('merge-stream')
const portfinder = require('portfinder')

const { HOST, PORT } = require('./config/index')

// nodemon重启后浏览器自动刷新的延迟时间
const DELAY_TIME = 1000

const reload = (time) => {
  time = time && typeof time === 'number' || 0
  setTimeout(() => {
    browserSync.reload()
  }, time)
}

console.log(HOST)

// 开发时运行server
gulp.task('server', ['default', 'nodemon'], () => {
  portfinder.basePort = PORT + 5
  portfinder.getPort((err, port) => {
    if (err) {
      console.log(err)
    } else {
      browserSync.init({
        // 以ip地址的方式打开
        open: 'external',
        port: port,
        proxy: `${HOST}${PORT}/upload`,
        notify: false,
      })
      gulp.watch('views/**/*.html').on('change', reload)
      // gulp.watch(COMPILE.css.src, ['less']).on('change', reload)
      // gulp.watch(COMPILE.js.src, ['js']).on('change', reload)
      // gulp.watch(COMPILE.png.src, ['image']).on('change', reload)
      // gulp.watch(COMPILE.jpg.src, ['image']).on('change', reload)
    }
  })
})

gulp.task('nodemon', (cb) => {
  let isStart = false
  return nodemon({
    script: 'app.js',
    ignore: ['node_modules/', 'public/**/*', 'views/**/*', 'gulpfile.js'],
  }).on('start', () => {
    if (!isStart) {
      cb()
      isStart = true
    }
  }).on('restart', () => {
    reload(DELAY_TIME)
  })
})

let defaultTask = []

gulp.task('default', defaultTask)
