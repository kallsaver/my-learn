var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var less = require('gulp-less');
var plumber = require('gulp-plumber');
var postcss = require('gulp-postcss');
//不是所有的前缀补全都支持,比如涉及伪元素的input::input-placeholder不支持,还是要手动写
var autoprefixer = require('gulp-autoprefixer');

var app = {
	srcPath : 'app/src/',
	distPath : 'app/dist/',
}

gulp.task('less',function(){
	return gulp.src( app.srcPath + 'less/*.less')
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
	.pipe(gulp.dest(  app.srcPath + 'css' ))
});

gulp.task('serve',['less'],function() {
    //启动服务器
    browserSync.init({
        //server不能和proxy同时设置;
        //server: "./app",
        //配合xamp的默认端口80或者443
        proxy : "http://127.0.0.1:8020/my-learn/gulp-hash/app/views/home.html",
        notify : false
    });

    gulp.watch( app.srcPath + 'less/*.less' ,['less']);
    gulp.watch( app.distPath + 'css/*.css' ).on('change', browserSync.reload);
    gulp.watch("app/views/*.html").on('change', browserSync.reload);
});

gulp.task('default', ['serve']);
