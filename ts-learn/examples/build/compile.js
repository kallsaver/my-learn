const { src, dest, watch, series, parallel } = require('gulp')
const browserSync = require('browser-sync').create()

function serverTask(cb) {
  browserSync.init({
    server: './',
    notify: false
  })
  cb()
}

function watchTask() {
  const watcher = watch('plugins')
  watcher.on('change', browserSync.reload)
  watcher.on('add', browserSync.reload)
}

const dev = series(
  parallel(serverTask),
  parallel(watchTask),
)

module.exports = {
  dev,
}
