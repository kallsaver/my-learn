const gulp = require('gulp')
const nodemon = require('gulp-nodemon')
const browserSync = require('browser-sync').create()
const reload = browserSync.reload

// 开发时运行server
// 在mac下会报错
// gulp.task('server', () => {
//   nodemon({
//     script: 'bin/www.js',
//     ignore: ['node_modules/', 'gulpfile.js']
//   }).on('start', function () {
//     browserSync.init({
//       // 以ip地址的方式打开
//       // open: 'external',
//       port: 4006,
//       proxy: `http://localhost:8067/`,
//       notify: false,
//     })
//     gulp.watch('src/**/*.js').on('change', reload)
//   })
// })

gulp.task('dev', () => {
  browserSync.init({
    // 以ip地址的方式打开
    // open: 'external',
    port: 4006,
    proxy: `http://localhost:8067/`,
    notify: false,
  })
  gulp.watch('src/**/*.js').on('change', reload)
  gulp.watch('app.js').on('change', reload)
})

gulp.task('default', () => {

})
