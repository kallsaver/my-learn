const path = require('path')
const Promise = require('bluebird')
const chalk = require('chalk')
const chokidar = require('chokidar')
const yargsParser = require('yargs-parser')
const execa = require('execa')
const clean = require('./clean')
const build = require('./build')
const mock = require('./mock')
const { distDir, configDir, wxdevtools } = require('./utils')

const cwd = process.cwd()
const env = Object.assign({}, process.env)
const argv = yargsParser(process.argv, {
  alias: {
    q: 'quit',
    o: 'open'
  }
})

async function quitWxdevtools() {
  return execa(wxdevtools, ['--quit'], {
    cwd,
    env,
    stdio: 'inherit'
  })
}

async function openIDE(distDir) {
  return execa(wxdevtools, ['--open', distDir], {
    cwd,
    env,
    stdio: 'ignore'
  })
}

async function start() {
  await quitWxdevtools()
  if (argv.open) {
    return openIDE(typeof argv.open === 'string' ? path.join(cwd, argv.open) : distDir)
  }

  await clean()
  Promise.all([build(), mock()]).then(() => {
    console.log(chalk`{cyan 启动完成}`)
  })

  let configReady = false
  chokidar.watch(configDir).on('all', (event) => {
    if (configReady) {
      build({
        cache: false
      })
    }
  }).on('ready', () => {
    configReady = true
  })
}

if (!module.parent) {
  start()
} else {
  module.exports = start
}
