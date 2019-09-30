'use strict'
var gulp = require('gulp')
var browserSync = require('browser-sync').create()
var less = require('gulp-less')
var stylus = require('gulp-stylus')
var plumber = require('gulp-plumber')
var postcss = require('gulp-postcss')
//不是所有的前缀补全都支持,比如涉及伪元素的input::input-placeholder不支持,还是要手动写
var autoprefixer = require('gulp-autoprefixer')
var minifycss = require('gulp-minify-css')
var smushit = require('gulp-smushit')
var imagemin = require('gulp-imagemin')
var fontmin = require('gulp-fontmin')

var settings = {
  less: {
    src: ['resource/less/**/*.less'],
    dest: 'resource/less-css'
  },
  stylus: {
    src: ['resource/stylus/**/*.styl'],
    dest: 'resource/stylus-css'
  }
}

gulp.task('less', function () {
  return gulp.src(settings.less.src)
	.pipe(plumber({
		errorHandler: function () {
			this.emit('end')
		}
	}))
	.pipe(less())
	.on('error', function (err) {
		console.log('Error: ', err.message)
	})
	.pipe(autoprefixer())
  .pipe(minifycss({
      // 默认true,是否开启高级优化(合并选择器)
      // advanced: false,
      // 保留ie7以下兼容写法
      compatibility: 'ie7',
      // 保留autoprefixer的特殊前缀
  }))
  .pipe(gulp.dest(settings.less.dest))
})

gulp.task('stylus',function() {
  return gulp.src(settings.stylus.src)
	.pipe(plumber({
		errorHandler: function () {
			this.emit('end')
		}
	}))
	.pipe(stylus())
	.on('error', function (err) {
		console.log('Error: ',err.message)
	})
	.pipe(autoprefixer())
  .pipe(minifycss({
      // 默认true,是否开启高级优化(合并选择器)
      //advanced: false,
      // 保留ie7以下兼容写法
      compatibility: 'ie7',
      // 保留autoprefixer的特殊前缀
  }))
  .pipe(gulp.dest(settings.stylus.dest))
})

function minifyFont(text, cb) {
  gulp.src('resource/less/fonts/*.ttf')
  .pipe(fontmin({
      text: text
  }))
  .pipe(gulp.dest('resource/css/fonts/'))
  .on('end', cb)
}

gulp.task('fonts', function (cb) {
  var buffers = []
  gulp.src('views/fonts.html')
  .on('data', function (file) {
      buffers.push(file.contents)
  })
  .on('end', function () {
      var text = Buffer.concat(buffers).toString('utf-8')
      minifyFont(text, cb)
  })
})

// Static Server + watching scss/html files
gulp.task('serve', ['stylus'], function () {
  // 启动服务器
  browserSync.init({
    port: 4005,
    // server不能和proxy同时设置
    server: './views',
    // 配合xamp的默认端口80或者443
    notify: false
  })
  gulp.watch('views/**/*.html').on('change', browserSync.reload)
  gulp.watch('resource/stylus/**/*.styl', ['stylus']).on('change', browserSync.reload)
})

// 压缩图片的设置目录
var imageSrc = 'resource/images/src/april2018/'
var imageDist = 'resource/images/dist/april2018/'

// yahoo出品的图片压缩工具,对png的优化不高,对jpg的可以压缩60%
gulp.task('smushit', function () {
  return gulp.src( imageSrc + '*.{png,jpg}')
  .pipe(plumber({
      errorHandler : function () {
          this.emit('end')
      }
  }))
  .pipe(smushit({
      verbose : true
  }))
  .on('error',function (err) {
      console.log('Error: ',err.message)
  })
  .pipe(gulp.dest(imageDist))
})

// 另一款图片压缩工具,对png可以压缩一点点,对jpg压缩率不高
gulp.task('imagemin', function () {
  gulp.src(imageSrc + '*.{png,jpg,gif,ico}')
  .pipe(imagemin({
      optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
      progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
      interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
      multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
  }))
  .pipe(gulp.dest(imageDist))
})

gulp.task('default', ['serve'])
