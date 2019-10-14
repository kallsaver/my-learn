const rollup = require('rollup')
const builds = require('./config').getAllBuilds()
const { resolve } = require('./utils')

async function build() {
  for (let i = 0; i < builds.length; i++) {
    let config = builds[i]
    await (() => {
      return new Promise((resolve) => {
        rollup.rollup({
          input: config.input,
          plugins: config.plugins
        }).then((bundle) => {
          bundle.write(config.output)
          resolve()
        })
      }).catch(() => {
        console.error(err)
      })
    })()
  }
}

module.exports = {
  build,
}

