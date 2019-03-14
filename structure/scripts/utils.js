const path = require('path')
const resolve = require('resolve')
const ip = require('dev-ip')

const rootDir = path.join(__dirname, '../')
const mockDir = path.join(__dirname, '../mock')
const distDir = path.join(__dirname, '../dist')
const configDir = path.join(__dirname, '../config')
const wxdevtools = resolve.sync(path.join('wxdevtools-cli', 'bin/wxdevtools.js'), { basedir: rootDir })

module.exports = {
  rootDir,
  distDir,
  mockDir,
  configDir,
  wxdevtools,
  devIp: ip()[0] || '127.0.0.1',
  devPort: 9080
}
