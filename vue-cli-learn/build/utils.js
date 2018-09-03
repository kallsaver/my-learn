'use strict'
// 这个文件是工具包,所以用的都是exports语法
// 封装了文件名的方法,.vue文件中提取css,非.vue文件提取css
const path = require('path')
const config = require('../config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const packageConfig = require('../package.json')


// 处理生成的css和js文件,放到设置的assetsSubDirectory目录下的_path目录下
exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory
  // path.posix.join是得到从项目根目录开始到这个文件的绝对路径
  return path.posix.join(assetsSubDirectory, _path)
}

// 带入sourceMap,extract,usePostCSS参数
exports.cssLoaders = function (options) {
  options = options || {}

  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  // generateLoaders这个方法处理了.vue中使用extract-text-webpack-plugin插件
  // 从.vue文件中提取postcss,less,sass,stylus,css到一个css文件的各种写法
  function generateLoaders (loader, loaderOptions) {
    // 如果设置使用postcss,css文件处理的loader则加上postcss-loader
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]

    // loaders从上往下是css-loader => postcss-loader => less-loader等
    // 所以generateLoaders()不带参数是表示css-loader,带参数是预处理loader
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        // Object.assign传递项的参数是undefined没问题
        // 自定义loader的options
        options: Object.assign({}, loaderOptions, {
            sourceMap: options.sourceMap
        })
      })
    }

    // 提取功能
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        // vue-style-loader包含了style-loader的所有功能,并且支持less,sass等
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }

  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  // vue-loader本身就支持编译less,sass等变成style标签
  // 这种写法是因为webpack从.vue文件中提取css是这样写的
  return {
    // 顺序也很讲究,因为loader是从下往上执行
    // less,sass预编译语言等loader => postcss-loader => css-loader
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// 返回一个数组插入rules
// styleLoaders是处理非.vue文件使用的less,sass等文件,
// vue-style-loader包含了style-loader的功能
exports.styleLoaders = function (options) {
  const output = []
  const loaders = exports.cssLoaders(options)

  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }

  return output
}

exports.createNotifierCallback = () => {
  const notifier = require('node-notifier')

  return (severity, errors) => {
    if (severity !== 'error') return

    const error = errors[0]
    const filename = error.file && error.file.split('!').pop()

    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png')
    })
  }
}
