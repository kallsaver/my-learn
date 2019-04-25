var gulp = require('gulp');
var browserSync = require('browser-sync').create();

gulp.task('serve', function () {
    //启动服务器
    browserSync.init({
        server: "./",
        notify: false
    });
});

gulp.task('default', ['serve'])