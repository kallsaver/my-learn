'use strict'
const path = require('path')
const fs = require('fs')
const gulp = require('gulp')
const smushit = require('gulp-smushit')
const imagemin = require('gulp-imagemin')
const plumber = require('gulp-plumber')
const merge = require('merge-stream')

function existsSync(filePath) {
  try {
    fs.statSync(filePath, fs.constants.R_OK | fs.constants.W_OK);
    return true
  } catch (err) {
    return false
  }
}

const ALL = '**'

let target = process.argv[3] ? process.argv[3].slice(1) : ALL

let taskList = []

if (target !== ALL) {
  let isExists = existsSync(path.join(__dirname, `./src/images/${target}`))
  if (!isExists) {
    taskList = ['error']
  }
}

let dest = target === ALL ? `dist/images/` : `dist/images/${target}`

gulp.task('image', taskList, () => {
  // yahoo出品的图片压缩工具,对png的优化不高,对jpg,jpeg的可以压缩60%
  let jpgmini = gulp.src([`src/images/${target}/**/*`, `!src/images/${target}/**/*.png`])
    .pipe(plumber({
      errorHandler: () => {
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
  let pngmini = gulp.src([`src/images/${target}/**/*.png`])
    .pipe(plumber({
      errorHandler: () => {
        this.emit('end')
      }
    }))
    .pipe(imagemin({
      // 类型：Number  默认：3  取值范围：0-7（优化等级）
      optimizationLevel: 5,
      // 类型：Boolean 默认：false 无损压缩jpg图片
      progressive: true,
      // 类型：Boolean 默认：false 隔行扫描gif进行渲染
      interlaced: true,
      // 类型：Boolean 默认：false 多次优化svg直到完全优化
      multipass: true
    }))
    .pipe(gulp.dest(dest))

  return merge(jpgmini, pngmini)
})

gulp.task('error', () => {
  console.log(`目录 src/images/${target}不存在!`)
})
