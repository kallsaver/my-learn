const fs = require('fs')

function existsSync(filePath) {
  try {
    fs.statSync(filePath, fs.constants.R_OK | fs.constants.W_OK);
    return true
  } catch (err) {
    return false
  }
}

function mkdirSync(dirname) {
  if (existsSync(dirname)) {
    return true
  } else {
    if (mkdirSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname)
      return true
    }
  }
}

module.exports = {
  existsSync,
  mkdirSync
}
