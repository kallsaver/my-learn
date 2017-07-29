'use strict';
var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var babel = require('gulp-babel');
var less = require('gulp-less');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var webserver = require('gulp-webserver');



gulp.task('babel',function(){
  return gulp.src('app/src/js/*.js')
        .pipe(plumber({
          errorHandler : function(){
                this.emit('end');
          }
        }))
        .pipe(babel({
          presets: ['es2015']
        }))
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
gulp.task('serve',['sass','less','babel'],function() {
    //启动服务器
    // 默认监听这个项目中所有文件的变化都会触发浏览器刷新
    gulp.src('./')
    .pipe(webserver({
      livereload: true,
      directoryListing: true,
      open: true
    }));
    gulp.watch("app/src/js/*.js", ['babel']);
});

gulp.task('default', ['serve']);
