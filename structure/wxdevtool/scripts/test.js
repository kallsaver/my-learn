const path = require('path')
const resolve = require('resolve')
const execa = require('execa')

const cwd = process.cwd()
const env = Object.assign({}, process.env)
const distDir = path.join(__dirname, '../dist')

const rootDir = path.join(__dirname, '../')
const wxdevtools = resolve.sync(path.join('wxdevtools-cli', 'bin/wxdevtools.js'), { basedir: rootDir })

execa(wxdevtools, ['-o', distDir], {
  cwd,
  env,
  stdio: 'ignore'
}).then(() => {
  console.log(666)
})

module.exports = {
  wxdevtools,
}
