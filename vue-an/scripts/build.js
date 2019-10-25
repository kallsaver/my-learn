const fs = require('fs')
const path = require('path')
const rollup = require('rollup')

if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist')
}

let builds = require('./config').getAllBuilds()

build(builds)

function build(builds) {
  let built = 0
  const total = builds.length
  const next = () => {
    buildEntry(builds[built]).then(() => {
      built++
      if (built < total) {
        next()
      }
    }).catch(logError)
  }

  next()
}

function buildEntry(config) {
  const output = config.output
  const { file, banner } = output
  return rollup.rollup(config)
    .then(bundle => bundle.generate(output))
}

function logError(e) {
  console.log(e)
}
