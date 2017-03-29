'use strict';
var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var less = require('gulp-less');
var plumber = require('gulp-plumber');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('less1',function(){
  return gulp.src('less/style.less')
       	 .pipe(plumber({
          	errorHandler : function(error){
            	this.emit('end');
          	}
        	}))
         .pipe(less())
         .on('error',function(err){
           console.log('Error:',err.message)
         })
         .pipe(autoprefixer({
         		//https://github.com/ai/browserslist#queries
         		browsers: ['last 5 versions'],
         		casade : false,
         		remove : true
         }))
         .pipe(gulp.dest('css/official02'))
         .pipe(browserSync.stream());
});

gulp.task('less2',function(){
  return gulp.src('less/footer.less')
       	 .pipe(plumber({
          	errorHandler : function(error){
            	this.emit('end');
          	}
        	}))
         .pipe(less())
         .on('error',function(err){
           console.log('Error:',err.message)
         })
         .pipe(gulp.dest('css/official01'))
         .pipe(browserSync.stream());
});

// Static Server + watching scss/html files
gulp.task('serve',['less1','less2'],function() {
    //启动服务器
    browserSync.init({
        server: "./",
        notify : false
    });


    gulp.watch("less/style.less", ['less1']);
 		gulp.watch("less/footer.less", ['less2']);
    //src变化触发编译dist变化,再触发浏览器刷新
    gulp.watch("js/*.js").on('change',browserSync.reload);
    gulp.watch("./*.html").on('change', browserSync.reload);
    gulp.watch("css/*.css").on('change',browserSync.reload);
});


gulp.task('default', ['serve']);
