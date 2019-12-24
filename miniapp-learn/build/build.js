process.env.NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV : 'production'

const path = require('path')
const rm = require('rimraf')
const compile = require('./compile')
const config = require('./config')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

rm(resolve(config.output), (err) => {
  if (err) {
    throw err
  }
  compile.build()
})
