const fs = require('fs')
const path = require('path')

function mkdirsSync (dirname) {
  if (fs.existsSync(dirname)) {
    return true
  } else {
    if (mkdirsSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname)
      return true
    }
  }
}

function checkFileSync (fileName) {
  let dirname = fileName.replace(/(.*)\\.*/, '$1')
  mkdirsSync(dirname)
}

module.exports = {
  mkdirsSync,
  checkFileSync,
}
