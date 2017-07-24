'use strict';
var gulp         = require('gulp');
var browserSync  = require('browser-sync').create();
var less         = require('gulp-less');
var plumber      = require('gulp-plumber');
var postcss      = require('gulp-postcss');
//不是所有的前缀补全都支持,比如涉及伪元素的input::input-placeholder不支持,还是要手动写
var autoprefixer = require('gulp-autoprefixer');
var cleancss     = require('gulp-clean-css');

var baseDir = 'app/';

gulp.task('less',function(){
	return gulp.src( baseDir + 'less/*.less' )
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
    .pipe(cleancss({
        // 默认true,是否开启高级优化(合并选择器)
        advanced: false,
        // 保留ie7以下兼容写法
        compatibility: 'ie7',
        // 保留autoprefixer的特殊前缀
        keepSpecialComments: '*'
    }))    
	.pipe(gulp.dest( baseDir + 'css'))
})

// Static Server + watching scss/html files
gulp.task('serve',['less'],function() {
    //启动服务器
    browserSync.init({
        //server不能和proxy同时设置;
        server: {
    		// 当前目录
            baseDir : './' + baseDir,
        },
        //配合xamp的默认端口80或者443
        //proxy : "http://dev.daishutijian.com/pcsite/home",
        notify : false
    });

    //gulp.watch("**/*.{html,php}").on('change', browserSync.reload);
    gulp.watch( baseDir + 'less/*.less',['less'] );
    gulp.watch( baseDir + "**/*" ).on('change', browserSync.reload);
});



gulp.task('default', ['serve']);
