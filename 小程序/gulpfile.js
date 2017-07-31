'use strict';

var gulp        = require('gulp');
var less = require('gulp-less');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');

gulp.task('less',function(){
return gulp.src('compile/pages/**/*.less')
        .pipe(plumber({
          errorHandler : function(error){
            console.log(error.message);
            this.emit('end');
          }
        }))
        .pipe(less())
        .pipe(rename(function(path){
        	path.extname = ".wxss"
        }))
        .pipe(gulp.dest('app/pages/'));
});

gulp.task('serve',['less'],function() {
   
	//不能使用./ 
	gulp.watch('compile/**/*.less',['less']);
	
});

gulp.task('default', ['serve']);

