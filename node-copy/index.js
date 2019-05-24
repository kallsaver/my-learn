const path = require('path')
const fsTools = require('./helpers/fs-tools.js')

const src = path.join(__dirname, './src')
const dist = path.join(__dirname, './dist')

console.log(fsTools.existsSync(src))


