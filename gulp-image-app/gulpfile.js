'use strict'
const path = require('path')
const fs = require('fs')
const gulp = require('gulp')
const smushit = require('gulp-smushit')
const imagemin = require('gulp-imagemin')
const plumber = require('gulp-plumber')
const merge = require('merge-stream')
const Fontmin = require('fontmin')
const fontmin = new Fontmin()

function existsSync(filePath) {
  try {
    fs.statSync(filePath, fs.constants.R_OK | fs.constants.W_OK);
    return true
  } catch (err) {
    return false
  }
}

const ALL = '**'
const IMAGES = 'images'
const FONTS = 'fonts'

let task = process.argv[2]
let target = process.argv[3] ? process.argv[3].slice(1) : ALL

let taskList = []

if (target !== ALL) {
  let isExists = existsSync(path.join(__dirname, `./src/${task}/${target}`))
  if (!isExists) {
    taskList = ['error']
  }
}

let dest = target === ALL ? `dist/${task}/` : `dist/${task}/${target}`

gulp.task('images', taskList, () => {
  // yahoo出品的图片压缩工具,对png的优化不高,对jpg,jpeg的可以压缩60%
  let miniJpg = gulp.src([`src/${IMAGES}/${target}/**/*`, `!src/${IMAGES}/${target}/**/*.png`])
    .pipe(plumber({
      errorHandler: function() {
        this.emit('end')
      }
    }))
    .pipe(smushit({
      verbose: true
    }))
    .on('error', (err) => {
      console.log('Error: ', err.message)
    })
    .pipe(gulp.dest(dest))

  // 另一款图片压缩工具, 对png可以压缩一点点, 对jpg压缩率不高
  let miniPng = gulp.src([`src/${IMAGES}/${target}/**/*.png`])
    .pipe(plumber({
      errorHandler: () => {
        this.emit('end')
      }
    }))
    .pipe(imagemin({
      // Number,默认3,取值范围0-7(优化等级)
      optimizationLevel: 5,
      // Boolean,默认false,无损压缩jpg图片
      progressive: true,
      // Boolean,默认false,隔行扫描gif进行渲染
      interlaced: true,
      // Boolean,默认false,多次优化svg直到完全优化
      multipass: true
    }))
    .pipe(gulp.dest(dest))

  return merge(miniJpg, miniPng)
})


gulp.task('fonts', taskList, () => {
  let textList = [
    // 'qwertyuiopasdfghjklzxcvbnm',
    // 'QWERTYUIOPASDFGHJKLZXCVBNM',
    // '0123456789',
    // 'TCL邀你畅玩CES亲身体验黑科技'
    'TCL'
  ]

  let text = textList.join('')

  fontmin.src(`src/${FONTS}/${target}/*.ttf`)
    .use(Fontmin.glyph({
      text: text
    }))
    .use(Fontmin.ttf2eot())
    .use(Fontmin.ttf2woff())
    .use(Fontmin.ttf2svg())
    .use(Fontmin.css())
    .dest(dest)

  fontmin.run(function (err, files, stream) {
    if (err) {
      console.error(err)
    }
    console.log('done')
  })
})

gulp.task('error', (err) => {
  console.log(`目录 src/${task}/${target}不存在!`)
})
