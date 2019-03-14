const chalk = require('chalk')
const execa = require('execa')
const { distDir, wxdevtools } = require('./utils')

const cwd = process.cwd()
const env = Object.assign({}, process.env)

async function preview() {
  console.log(chalk`正在生成预览二维码`)
  execa(wxdevtools, ['--preview', distDir, '--preview-qr-output'], {
    cwd,
    env,
    stdio: 'inherit'
  }).then((result) => {
    console.log(chalk`{green 微信扫描二维码}`)
  }).catch((error) => {
    const stderr = error.stderr
    const reg = /\\{1,2}"error\\{1,2}":\\{1,2}"(.*)\\{1,2}"/g
    const match = reg.exec(stderr)

    console.log(chalk`{red ${match[1]}}`)
  })
}

if (!module.parent) {
  preview()
} else {
  module.exports = preview
}
