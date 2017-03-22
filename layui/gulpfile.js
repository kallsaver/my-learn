'use strict';
var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var less = require('gulp-less');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');


gulp.task('less',function(){
  return gulp.src('src/less/*.less')
        .pipe(plumber({
          errorHandler : function(error){
            console.log(error.message);
            this.emit('end');
          }
        }))
        .pipe(less())
        .pipe(gulp.dest('dist/css'));
});

// Static Server + watching scss/html files
gulp.task('serve',['less'],function() {
    //启动服务器
    browserSync.init({
        server: "./",
        notify : false
    });

    gulp.watch("./*.html").on('change', browserSync.reload);
});


gulp.task('default', ['serve']);
