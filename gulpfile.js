'use strict';
var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var babel = require('gulp-babel');
var less = require('gulp-less');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');

gulp.task('babel',function(){
	return gulp.src('app/src/js/*.js')
        .pipe(plumber())
        .pipe(babel())
        .on('error',function(err){
          console.log('Error:',err.message)
        })
        .pipe(rename(function(path){
            path.basename += '-babel';
        }))
        .pipe(gulp.dest('app/dist/js'));
});

gulp.task('less',function(){
  return gulp.src('app/src/less/*.less')
        .pipe(plumber({
          errorHandler : function(error){
            console.log(error.message);
            this.emit('end');
          }
        }))
        .pipe(less())
        .pipe(gulp.dest('app/dist/css'));
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("app/src/scss/*.scss")
        .pipe(plumber({
          errorHandler : function(error){
            this.emit('end');
          }
        }))
        .pipe(sass())
        .pipe(gulp.dest("app/dist/css"))
        .pipe(browserSync.stream());
});

// Static Server + watching scss/html files
gulp.task('serve',[],function() {
    //启动服务器
    browserSync.init({
        //server: "./app",
        proxy : "127.0.0.1:8020/my-learn/H5Project/上下拉刷新/isScroll.html",
        notify : false
    });
	
	//不能使用./ 
	//使用下面两者结合,可以监听一个文件夹中的所有js文件
	gulp.watch("H5Project/*.js").on('change', browserSync.reload);
    gulp.watch("H5Project/**/*.js").on('change', browserSync.reload);
    gulp.watch("H5Project/*.html").on('change', browserSync.reload);
    gulp.watch("H5Project/**/*.html").on('change', browserSync.reload);
});

gulp.task('default', ['serve']);