const gulp = require('gulp')
const nodemon = require('gulp-nodemon')
const browserSync = require('browser-sync').create()

const DELAY = 5000

const nodemonWatch = ['src/router', 'app.js', 'bin/www.js']

const DEFAULT_TIME_SLICE = 400

function Debounce(timeSlice = DEFAULT_TIME_SLICE)  {
  this.timeSlice = timeSlice
}

Debounce.prototype.run = function (func) {
  if (typeof func === 'function') {
    if (this.timer) {
      clearTimeout(this.timer)
    }
    this.timer = setTimeout(func, this.timeSlice)
  }
}

let debounce = new Debounce()

const reload = function (time) {
  time = time || 0
  setTimeout(() => {
    browserSync.reload()
  }, time)
}

gulp.task('nodemon', (cb) => {
  let isStart = false
  return nodemon({
    script: 'bin/www.js',
    watch: nodemonWatch,
  }).on('start', () => {
    if (!isStart) {
      cb()
      isStart = true
    }
  }).on('restart', () => {
    debounce.run(() => {
      reload(DELAY)
    })
  })
})

// 开发时运行server
gulp.task('server', ['nodemon'], () => {
  browserSync.init({
    // 以ip地址的方式打开
    open: 'external',
    port: 4006,
    proxy: `http://localhost:8067/`,
    notify: false,
  })
  gulp.watch('src/**/*.js').on('change', () => {
    reload()
  })
  gulp.watch('src/views/*.html').on('change', () => {
    reload()
  })
})

gulp.task('default', () => {
  console.log('default')
})
