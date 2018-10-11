const svgtofont = require('svgtofont')
const path = require('path')
const glob = require('glob-all')

// 约定项目放置svg图片的目录
const IMAGES_FOLDER = 'images'
// 约定项目放置处理成fonts的目录
const FONTS_FOLDER = 'fonts'

// 全局字体前缀(common里面的)
const APP_PREFIX = 'common-'
// 全局字体所在的目录
const APP_FOLDER = 'common'

// ui组件字体前缀
const UIKIT_PREFIX = 'vi-'
// ui组件所在目录
const UIKIT_FOLDER = 'uikit'

let distRuler = new RegExp(`(.*\/)?${IMAGES_FOLDER}`, 'g')
let fontNameRuler = new RegExp(`(.*\/)?(.*)?\/${IMAGES_FOLDER}`, 'g')

let fontFiles = glob.sync([
  path.resolve(__dirname, `src/common/**/${IMAGES_FOLDER}`),
  path.resolve(__dirname, `src/uikit/**/${IMAGES_FOLDER}`)
])

fontFiles.forEach((item) => {
  console.log(item)
  let dist = item.replace(distRuler, `$1${FONTS_FOLDER}`)
  let fontName = ''
  if (item.indexOf(UIKIT_FOLDER) !== -1) {
    fontName = UIKIT_PREFIX + item.replace(fontNameRuler, `$2`)
  } else if (item.indexOf(APP_FOLDER) !== -1) {
    fontName = APP_PREFIX
  }

  console.log(fontName)
  console.log(dist)
  svgtofont({
    src: item,
    dist,
    fontName,
    css: true,
    startNumber: 20000,
  }).then(() => {
    // console.log('done')
  }).catch((err) => {
    // console.log(err)
  })
})


