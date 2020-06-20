'use strict'

const path = require('path')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  dev: {
    useEslint: true,
  },
  build: {
    assetsRoot: resolve('dist'),
    assetsSubDirectory: 'static',
  }
}
