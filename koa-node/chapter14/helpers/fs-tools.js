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

// 创建一个目录,如果这个目录没有则递归创建父目录
function mkdirSync (dirname) {
  if (existsSync(dirname)) {
    return true
  } else {
    if (mkdirSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname)
      return true
    }
  }
}

function checkFileSync (fileName) {
  let dirname = path.dirname(fileName)
  mkdirSync(dirname)
}

function writeFileSync () {
  return new Promise((resolve, reject) => {
    let fileName = arguments[0]
    let dirname = path.dirname(fileName)
    mkdirSync(dirname)
    try {
      fs.writeFileSync(...arguments)
      resolve()
    } catch (err) {
      console.log(err)
      reject()
    }
  })
}

module.exports = {
  existsSync,
  mkdirSync,
  checkFileSync,
  writeFileSync,
}
