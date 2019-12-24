const path = require('path')
const { src, dest, watch, series, parallel } = require('gulp')
const gulpSass = require('gulp-sass')
const gulpLess = require('gulp-less')
const gulpRename = require('gulp-rename')
const gulpPlumber = require('gulp-plumber')
const config = require('./config')
const defineConst = require('./define-const')
const { Throttle } = require('./util')

const throttle = new Throttle(2000)

let isWriteInWorkspace = false

const lessFilePath = [
  `${config.workspace}/**/*.less`
]
const sassFilePath = [
  `${config.workspace}/**/*.scss`
]
const copyFilePath = [
  `${config.workspace}/**/*`,
  `!${config.workspace}/**/*.less`,
  `!${config.workspace}/**/*.scss`,
  `!${config.workspace}/**/*.md`
]

function resolveWindowPath(path) {
  return path.replace(/\\/g, '/')
}

function changeDirName(filePath, fileMessage) {
  const pattern = new RegExp(`^${config.workspace}\/?(.*)?\/.+$`, 'g')
  const dirname = filePath.replace(pattern, '$1')
  fileMessage.dirname = dirname
}

function compileCopy(copyFilePath, isSingleFile) {
  return src(copyFilePath)
    .pipe(gulpRename((fileMessage) => {
      if (isSingleFile) {
        changeDirName(copyFilePath, fileMessage)
      }
    }))
    .pipe(dest(config.output))
}

function compileLess(lessFilePath, isSingleFile) {
  return src(lessFilePath)
    .pipe(gulpLess())
    .pipe(gulpRename((fileMessage) => {
      if (isSingleFile) {
        changeDirName(lessFilePath, fileMessage)
      }
      fileMessage.extname = '.wxss'
    }))
    .pipe(dest(config.output))
}

function compileSass(sassFilePath, isSingleFile) {
  return src(sassFilePath)
    .pipe(gulpSass())
    .pipe(gulpRename((fileMessage) => {
      if (isSingleFile) {
        changeDirName(sassFilePath, fileMessage)
      }
      fileMessage.extname = '.wxss'
    }))
    .pipe(dest(config.output))
}

function watchLess(lessFilePath) {
  const lessWatcher = watch(lessFilePath)
  lessWatcher.on('change', (path) => {
    isWriteInWorkspace = true
    console.log('less file change success')
    compileLess(resolveWindowPath(path), true)
  })
  lessWatcher.on('add', (path) => {
    isWriteInWorkspace = true
    console.log('less file add success')
    compileLess(resolveWindowPath(path), true)
  })
}

function watchSass(sassFilePath) {
  const sassWatcher = watch(sassFilePath)
  sassWatcher.on('change', (path) => {
    isWriteInWorkspace = true
    console.log('sass file change success')
    compileSass(resolveWindowPath(path), true)
  })
  sassWatcher.on('add', (path) => {
    isWriteInWorkspace = true
    console.log('sass file add success')
    compileSass(resolveWindowPath(path), true)
  })
}

function watchCopy(copyFilePath) {
  const copyWatcher = watch(copyFilePath)
  copyWatcher.on('change', (path) => {
    isWriteInWorkspace = true
    console.log('copy file change success')
    compileCopy(resolveWindowPath(path), true)
  })
  copyWatcher.on('add', (path) => {
    isWriteInWorkspace = true
    console.log('copy file add success')
    compileCopy(resolveWindowPath(path), true)
  })
}

function copyTask(cb) {
  console.log('copy task start')
  return compileCopy(copyFilePath)
}

function lessTask(cb) {
  console.log('less task start')
  return compileLess(lessFilePath)
}

function sassTask(cb) {
  console.log('sass task start')
  return compileSass(sassFilePath)
}

function watchTask(cb) {
  console.log('watch task start')
  watchLess(lessFilePath)
  watchSass(sassFilePath)
  watchCopy(copyFilePath)
  cb()
}

function defineConstTask(cb) {
  console.log('defineConst task start')
  defineConst.setEnv()
  defineConst.setDevelopmentConst()
  cb()
}

function writeDistWarnTask(cb) {
  console.log('writeDistWarn task start')
  const warnWatcher = watch([
    `${config.output}/**/*`,
  ])
  const warnWatchHanlder = (path) => {
    throttle.run(() => {
      if (!isWriteInWorkspace) {
        console.log(`请不要直接在${config.output}下写代码,会无法保存,请在${config.workspace}下写`)
        // process.exit()
      }
      isWriteInWorkspace = false
    })
  }
  warnWatcher.on('change', warnWatchHanlder)
  warnWatcher.on('add', warnWatchHanlder)
  cb()
}

const build = series(
  parallel(copyTask, lessTask, sassTask),
  parallel(defineConstTask),
  parallel(() => {
    console.log('--------------all task finish success--------------')
  })
)

const dev = series(
  parallel(copyTask, lessTask, sassTask),
  parallel(defineConstTask),
  parallel(watchTask),
  parallel(writeDistWarnTask),
  parallel(() => {
    console.log('--------------all task finish success--------------')
  })
)

module.exports = {
  dev,
  build,
}

