'use strict';
var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var babel = require('gulp-babel');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');



gulp.task('babel',function(){
  return gulp.src('src/js/*.js')
        .pipe(plumber())
        .pipe(babel())
        .on('error',function(err){
          console.log('Error:',err.message)
        })
        .pipe(rename(function(path){
            path.basename += '-babel';
        }))
        .pipe(gulp.dest('dist/js'));
});


// Static Server + watching scss/html files
gulp.task('serve',['babel'],function() {
    //启动服务器
    browserSync.init({
        server: "./",
        notify : false
    });

    gulp.watch("src/js/*.js", ['babel']);
    //src变化触发编译dist变化,再触发浏览器刷新
    gulp.watch("dist/js/*.js").on('change',browserSync.reload);
    gulp.watch("./*.html").on('change', browserSync.reload);
});


gulp.task('default', ['serve']);

