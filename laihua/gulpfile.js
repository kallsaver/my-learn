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
            	this.emit('end');
          	}
        	}))
         .pipe(less())
         .on('error',function(err){
           console.log('Error:',err.message)
         })
         .pipe(gulp.dest('dist/css'))
         .pipe(browserSync.stream());
});

// Static Server + watching scss/html files
gulp.task('serve',['less'],function() {
    //启动服务器
    browserSync.init({
        server: "./",
        notify : false
    });


    gulp.watch("src/less/*.less", ['less']);

    //src变化触发编译dist变化,再触发浏览器刷新
    gulp.watch("dist/js/*.js").on('change',browserSync.reload);
    gulp.watch("./*.html").on('change', browserSync.reload);
    gulp.watch("dist/css/*.css").on('change',browserSync.reload);
});


gulp.task('default', ['serve']);
