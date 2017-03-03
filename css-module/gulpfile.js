'use strict';
var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var babel       = require('gulp-babel');
var less        = require('gulp-less');
var plumber     = require('gulp-plumber');
var rename      = require('gulp-rename');
var prefixCSS   = require('gulp-prefix-css');
var concat      = require('gulp-concat');
var combo       = require('gulp-combo');

gulp.task('combo',function(){
  var baseUrl = 'src/css/combo.css';

  gulp.src('index.html')
  .pipe(combo(baseUrl,null))
  .pipe(gulp.dest('dist/css'))
})


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
        .pipe(plumber())
        .pipe(less())
        .on('error',function(err){
          console.log('Error:',err.message)
        })
        .pipe(gulp.dest('app/dist/css'));
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("app/src/scss/*.scss")
        .pipe(plumber())
        .pipe(sass())
        .on('error',function(err){
          console.log('Error:',err.message)
        })
        .pipe(gulp.dest("app/dist/css"))
        .pipe(browserSync.stream());
});

gulp.task('styles',function(){
  return gulp.src('app/dist/first.css')
})

// Static Server + watching scss/html files
gulp.task('serve',['sass','less','babel'],function() {
    //启动服务器
    browserSync.init({
        server: "./app"
    });

    gulp.watch("app/src/scss/*.scss", ['sass']);
    gulp.watch("app/src/less/*.less", ['less']);
    gulp.watch("app/src/js/*.js", ['babel']);
    //src变化触发编译dist变化,再触发浏览器刷新
    gulp.watch("app/dist/js/*.js").on('change',browserSync.reload);
    gulp.watch("app/*.html").on('change', browserSync.reload);
});




gulp.task('default', ['serve']);
