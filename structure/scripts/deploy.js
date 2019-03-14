const chalk = require('chalk')
const inquirer = require('inquirer')
const execa = require('execa')
const { distDir, wxdevtools } = require('./utils')
const pkg = require('../package.json')

const version = pkg.version
const cwd = process.cwd()
const env = Object.assign({}, process.env)

async function upload(message = `realse v${version}`) {
  console.log(chalk`{yellow 代码上传中...}`)
  await execa(wxdevtools, ['--upload', `${version}@${distDir}`, '--upload-desc', message], {
    cwd,
    env
  }).then((result) => {
    console.log(chalk`{green 代码上传完成}`)
  }).catch((error) => {
    const stderr = error.stderr
    const reg = /\\\\"error\\\\":\\\\"(.*)\\\\"/g
    const match = reg.exec(stderr)
    console.log(chalk`{red ${match[1]}}`)
  })
}

async function deploy(message) {
  console.log(chalk`准备 {yellow 上传小程序}`)
  if (message) {
    upload(message)
  } else {
    inquirer.prompt({
      type: 'input',
      name: 'upload-desc',
      message: chalk`上传代码 {cyan 备注:}`,
      default: `release v${version}`
    }).then((answers) => {
      return upload(answers['upload-desc'])
    })
  }
}

if (!module.parent) {
  deploy()
} else {
  module.exports = deploy
}
