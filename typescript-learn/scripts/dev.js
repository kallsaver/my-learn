const path = require('path')
const rollup = require('rollup')
const copy = require('ncp').ncp
const buildMap = require('./config')
const exec = require('child_process').exec
const name = require('../package.json').name

const TARGET = process.env.TARGET

async function buildEntry() {
  const build = buildMap[TARGET]
  console.log(build)

  if (build) {
    await (() => {
      return new Promise((resolve) => {
        const watcher = rollup.watch(build)
        watcher.on('event', event => {
          console.log(event.code)
          if (event.code === 'END') {
            copy('dist', `examples/plugins/${name}/`, function (err) {
              console.log(err)
            })
            console.log('--')
            resolve()
          }
        })
      })
    })()
  }
  await (() => {
    return new Promise((resolve) => {
      const cmd = `cd examples && npm run dev`
      const childProcess = exec(cmd, function (err, stdout, stderr) {
        if (err) {
          console.log('err:', err)
          return
        }
        console.log(`start examples`)
      })

      childProcess.stdout.on('data', (data) => {
        console.log(data)
      })
      resolve()
    })
  })()
}

buildEntry()
