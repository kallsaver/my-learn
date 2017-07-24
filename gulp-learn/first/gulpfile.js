//返回一个对象
var gulp = require('gulp');

var sass = require('gulp-sass');

var less = require('gulp-less');

var connect =require('gulp-connect');

var concat = require('gulp-concat');

var uglify = require('gulp-uglify');

var rename = require('gulp-rename');

var minifyCss = require('gulp-minify-css');

var imagemin = require('gulp-imagemin')


gulp.task('scripts',function(){
	return gulp.src('js/*.js')
	.pipe(concat('vendor.js'))
	.pipe(gulp.dest('dist/js'))
	.pipe(uglify())
	.pipe(rename('vendor.min.js'))
	.pipe(gulp.dest('dist/js'))
})

gulp.task('server',function(){
	//配置
	connect.server({
		//浏览器打开时的根目录
		root : 'dist',
		//是否实时刷新
		livereload : true,
		//端口　:
		port : 1992		
	});
});

gulp.task('jsonp',function(){
	return gulp.src('js/$jsonp.js')
	.pipe(uglify())
	.pipe(rename('$jsonp.min.js'))
	.pipe(gulp.dest('dist'))
})

//任务的名字,执行命令运行的函数
gulp.task('hello',function(){
  console.log('您好');
});

gulp.task('default',['server','watch']);

gulp.task('copy-index',function(){
  //src源地址  pipe管道  dest目的地  destination
  return gulp.src('index.html')
  .pipe(gulp.dest('dist'))
  //copy-index触发时回运行connect插件的reload功能
  .pipe(connect.reload());
});

gulp.task('images',function(){
  //不包含gif和png的图片
  return gulp.src('images/*.jpg').pipe(gulp.dest('dist/images'));
});

gulp.task('imagess',function(){
  return gulp.src('images/*.{png,jpg,gif}').pipe(gulp.dest('dist/images'));
});

// gulp.task('imagesAll',function(){
//   //这种方法有缺陷,只把二级文件夹拷贝,二级文件夹下面的文件不会被拷贝
//   return gulp.src('images/*').pipe(gulp.dest('dist/images'));
// })

gulp.task('imagesSub',function(){
  //拷贝二级目录中的所有文件
  return gulp.src('images/*/*').pipe(gulp.dest('dist/images'));
});

gulp.task('imagesAll',function(){
  //拷贝所有的文件
  return gulp.src('images/**/*')
  .pipe(imagemin())
  .pipe(gulp.dest('dist/images'))
  

});


gulp.task('data',function(){
  // !表示排除这个文件
	return gulp.src(['xml/*.xml', 'json/*.json', '!json/secret-*.json'])
				.pipe(gulp.dest('dist/data'));
});

//数组里面的任务是同时执行的,执行完毕后执行回调函数
gulp.task('build',['copy-index','imagesAll','data'],function(){
  console.log('build执行');
});

gulp.task('watch',function(){
  //意思是当index.html等文件发生变化的时候,执行数组里面的任务
  gulp.watch('index.html',['copy-index']);
  gulp.watch('images/**/*.{jpg}',['imagesAll']);
  gulp.watch(['xml/*.xml','json/*.json','!json/secret-*.json'],['data']);
});


gulp.task('sass',function(){
	return gulp.src('stylesheets/**/*.scss')
	.pipe(sass())
	.pipe(gulp.dest('dist/css'));
});

gulp.task('less',function(){
	return gulp.src('stylesheets/**/*.less')
	.pipe(concat('vendor.less'))
	.pipe(less())
	.pipe(gulp.dest('dist/css'))
	.pipe(minifyCss())
	.pipe(rename('vendor.min.css'))
	.pipe(gulp.dest('dist/css'))
});
