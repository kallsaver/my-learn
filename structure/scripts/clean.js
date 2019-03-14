/**
 * 清除 dist 文件夹
 *
 * @date 2018-03-03
 * @author diaoling<jinjian@hhdd.com>
 */
const rimraf = require('rimraf')
const Promise = require('bluebird')
const { distDir } = require('./utils')

const del = Promise.promisify(rimraf)

if (!module.parent) {
  del(distDir)
} else {
  module.exports = (filename = distDir) => del(filename)
}
