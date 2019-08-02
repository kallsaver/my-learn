const fs = require('fs')
const path = require('path')
const rollup = require('rollup')
// const terser = require('terser')
// const zlib = require('zlib')

if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist')
}

// let builds = require('./config')
