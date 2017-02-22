var gulp = require('gulp');
var babel = require('gulp-babel');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync').create();

// const logError = (stream) => {
//   stream.on('error', function(error) {
//     console.error(error)
//   })
//   this.emit('end');
//   return stream;
// }

gulp.task('babel', () =>{
  return gulp.src('src/*.js')
  当发生编译错误,后面的命令不再执行,'babel'任务结束
  .pipe(plumber({
    errorHandler : function(error){
      this.emit('end');
    }
  }))
  .pipe(babel())
  .pipe(gulp.dest('lib'))
});

gulp.task('serve',['babel'],function() {
    //启动服务器
    browserSync.init({
        server: "./"
    });
    gulp.watch("src/*.js", ['babel']);
    gulp.watch("src/*.js").on('change',browserSync.reload);
    gulp.watch("app/*.html").on('change', browserSync.reload);
});
gulp.task('default',['serve']);
