const path = require('path')
const fs = require('fs')

const src = path.join(__dirname, './src')
const dist = path.join(__dirname, './dist')

function exists (filePath) {
  try {
    fs.statSync(filePath, fs.constants.R_OK | fs.constants.W_OK);
    return true
  } catch (err) {
    return false
  }
}

console.log(exists(src))
console.log(exists(dist))



