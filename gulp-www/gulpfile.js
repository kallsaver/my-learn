'use strict';
var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var less = require('gulp-less');
var plumber = require('gulp-plumber');
var postcss = require('gulp-postcss');
// 不是所有的前缀补全都支持,比如涉及伪元素的input::input-placeholder不支持,还是要手动写
var autoprefixer = require('gulp-autoprefixer');
// 要配合谷歌浏览器的liveReload插件一起使用
var livereload = require('gulp-livereload');
var rename = require('gulp-rename');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

var indexPath = '';
livereload();

gulp.task('less',function(){
	return gulp.src('app/src/less/*.less')
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
	.pipe(minifyCss())
	.pipe(rename(function(path){
		path.basename += '.min'
	}))
	.pipe(gulp.dest('app/dist/css'))
});

//gulp.task('js',function(){
//	return gulp.src('app/src/js/*.js')
//});

gulp.task('serve',['less'],function() {
    //启动服务器
    browserSync.init({
        //server不能和proxy同时设置;
        server: "./app",
        //配合xamp的默认端口80或者443
        //proxy : "http://dev.daishutijian.com/pcsite/package/detail",
        notify : false
	});
	
	livereload.listen();
//  gulp.watch("**/*.{html,php}").on('change', browserSync.reload);
//  gulp.watch("views/home/*.php").on('change', browserSync.reload);
//  gulp.watch("resource/css/*.css").on('change', browserSync.reload);
//  gulp.watch("resource/js/*.js").on('change', browserSync.reload);
//  gulp.watch("views/**/*.php").on('change', browserSync.reload);
	
	
	gulp.watch('app/src/less/*.less',['less']);
	gulp.watch('app/src/js/*.js',['js']);
	// 监视app目录下所有文件
	gulp.watch('app/index.html').on('change',function(file){
		// 1.到浏览器把livereload的谷歌插件的中心点成实心
		// 2.index.html要changed一次,获得indexPath,然后app/dist下的监视才有效
		// 3.而且并不是热更新,总结就是不如browserSync.reload()好用
		indexPath = file.path;
		livereload.changed(file.path);
	})
	gulp.watch('app/dist/**/*.*').on('change',function(file){
		livereload.changed(indexPath);
	});
});



gulp.task('default', ['serve']);
