'use strict';
var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');


gulp.task('sass',function(){
  return gulp.src('src/sass/*.sass')
       	 .pipe(plumber({
          	errorHandler : function(error){
            	this.emit('end');
          	}
        	}))
         .pipe(sass())
         .on('error',function(err){
           console.log('Error:',err.message)
         })
         .pipe(gulp.dest('dist/css'));
});

// Static Server + watching scss/html files
gulp.task('serve',['sass'],function() {
    //启动服务器
    browserSync.init({
        server: "./",
        notify : false
    });


    gulp.watch("src/sass/*.sass", ['sass']);

    //src变化触发编译dist变化,再触发浏览器刷新
    gulp.watch("dist/js/*.js").on('change',browserSync.reload);
    gulp.watch("./*.html").on('change', browserSync.reload);
    gulp.watch("dist/css/*.css").on('change',browserSync.reload);
});


gulp.task('default', ['serve']);
