'use strict';
var gulp         = require('gulp');
var browserSync  = require('browser-sync').create();
var less         = require('gulp-less');
var plumber      = require('gulp-plumber');
var postcss      = require('gulp-postcss');
//不是所有的前缀补全都支持,比如涉及伪元素的input::input-placeholder不支持,还是要手动写
var autoprefixer = require('gulp-autoprefixer');
// cleancss是minifycss的升级版,但是有路径问题,不推荐使用
var cleancss     = require('gulp-clean-css');
var minifycss    = require('gulp-minify-css');
var concat       = require('gulp-concat');
var rev          = require('gulp-rev');
var uglify       = require('gulp-uglify');


gulp.task('less',function(){
	return gulp.src('src/less/**/*')
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
    .pipe(concat('all.css')) 
    .pipe(minifycss({
        // 默认true,是否开启高级优化(合并选择器)
        //advanced: false,
        // 保留ie7以下兼容写法
        compatibility: 'ie7',
        // 保留autoprefixer的特殊前缀
    }))
	.pipe(gulp.dest('dist/css'))
})

gulp.task('js',function(){
	return gulp.src('src/js/**/*')
    .pipe(concat('all.js'))
    .pipe(uglify()) 
	.pipe(gulp.dest('dist/js'))
})

gulp.task('bulid',function(){
    return gulp.src('dist/**/*')
    .pipe()
})

// Static Server + watching scss/html files
gulp.task('serve',['less','js'],function() {
    //启动服务器
    browserSync.init({
        //server不能和proxy同时设置;
        server: "./",
        //配合xamp的默认端口80或者443
        //proxy : "http://dev.daishutijian.com/pcsite/article/info_lists?page=1",
        notify : false
    });

    gulp.watch('less/**/*',['less']);
    gulp.watch('css/**/*').on('change', browserSync.reload);;
    gulp.watch("views/**").on('change', browserSync.reload);
    gulp.watch("js/**").on('change', browserSync.reload);
});



gulp.task('default', ['serve']);
