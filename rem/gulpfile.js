'use strict';
var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var less = require('gulp-less');
var plumber = require('gulp-plumber');
var postcss = require('gulp-postcss');
//不是所有的前缀补全都支持,比如涉及伪元素的input::input-placeholder不支持,还是要手动写
var autoprefixer = require('gulp-autoprefixer');


gulp.task('less',function(){
	return gulp.src('src/less/*.less')
	.pipe(plumber({
		errorHandler : function(){
			this.emit('end');
		}
	}))
	.pipe(less())
	.on('error',function(err){
		console.log('Error: ',err.message);
	})
	.pipe(autoprefixer())
	.pipe(gulp.dest('dist/css'))
});

// Static Server + watching scss/html files
gulp.task('serve',['less'],function() {
    //启动服务器
    browserSync.init({
        //server不能和proxy同时设置;
        //server: "./views",
        //配合xamp的默认端口80或者443
        //proxy : "http://dev.daishutijian.com/pcsite/package/detail",
        proxy : "http://127.0.0.1:8020/my-learn/rem/views/motherDay.html",
        //proxy : "http://127.0.0.1:8020/my-learn/rem/index.html",
        notify : false
    });

    gulp.watch('src/less/*.less',['less']);
    gulp.watch("dist/css/*.css").on('change', browserSync.reload);
    gulp.watch("src/js/*.js").on('change', browserSync.reload);
    gulp.watch("views/*.html").on('change', browserSync.reload);
    gulp.watch("index.html").on('change', browserSync.reload);
});



gulp.task('default', ['serve']);
