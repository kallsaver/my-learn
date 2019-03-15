const fs = require('fs')
const path = require('path')

// 是否存在一个文件
function existsSync(filePath) {
  try {
    fs.statSync(filePath, fs.constants.R_OK | fs.constants.W_OK);
    return true
  } catch (err) {
    return false
  }
}

// 创建一个目录,如果这个目录
function mkdirsSync (dirname) {
  if (existsSync(dirname)) {
    return true
  } else {
    if (mkdirsSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname)
      return true
    }
  }
}

function checkFileSync (fileName) {
  let dirname = path.dirname(fileName)
  mkdirsSync(dirname)
}

module.exports = {
  existsSync,
  mkdirsSync,
  checkFileSync,
}
