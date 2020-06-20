const gulp = require('gulp')
const nodemon = require('gulp-nodemon')
const browserSync = require('browser-sync').create()
const { HOST, PORT } = require('./config/index')

const DELAY_TIME = 5000

const DEFAULT_TIME_SLICE = 400

function Debounce(timeSlice = DEFAULT_TIME_SLICE)  {
  this.timeSlice = timeSlice
}

Debounce.prototype.run = (func) => {
  if (typeof func === 'function') {
    if (this.timer) {
      clearTimeout(this.timer)
    }
    this.timer = setTimeout(func, this.timeSlice)
  }
}

const debounce = new Debounce()

const reload = (time) => {
  time = time && typeof time === 'number' || 0
  setTimeout(() => {
    browserSync.reload()
  }, time)
}

gulp.task('nodemon', (cb) => {
  let isStart = false
  return nodemon({
    script: 'bin/www.js',
    ignore: [
      'node_modules/',
      'src/public/**/*',
      'src/views/**/*',
      'gulpfile.js'
    ],
  }).on('start', () => {
    if (!isStart) {
      cb()
      isStart = true
    }
  }).on('restart', () => {
    debounce.run(() => {
      reload(DELAY_TIME)
    })
  })
})

// 开发时运行server
gulp.task('dev', ['nodemon'], () => {
  browserSync.init({
    // 以ip地址的方式打开
    open: 'external',
    port: 4006,
    proxy: `${HOST}${PORT}`,
    notify: false,
  })
  gulp.watch('src/**/*.js').on('change', reload)
  gulp.watch('src/views/*.html').on('change', reload)
})

gulp.task('default', () => {
  console.log('default')
})

// dev: 升级gulp4,添加gulp-eslint
