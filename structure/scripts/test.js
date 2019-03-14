const chalk = require('chalk')
const execa = require('execa')
const { distDir, wxdevtools } = require('./utils')

const cwd = process.cwd()
const env = Object.assign({}, process.env)

async function test() {
  console.log(chalk`提交{cyan 自动化测试}`)
  execa(wxdevtools, ['--test', distDir], {
    cwd,
    env,
    stdio: 'inherit'
  })
}

if (!module.parent) {
  test()
} else {
  module.exports = test
}
