const fs = require('fs')
const path = require('path')

function resolveLogPath(dir) {
  return path.join(__dirname, '../logs', dir)
}

function createWriteStream(filename) {
  const pathname = resolveLogPath(filename)
  const writeStream = fs.createWriteStream(pathname, {
    // 打开文件用于追加。 如果文件不存在，则创建该文件
    flags: 'a'
  })
  return writeStream
}

const accessWriteStream = createWriteStream('access.log')

function writeLog(writeStream, log) {
  writeStream.write(log + '\n')
}

function access(log) {
  let text
  if (log && typeof log === 'object') {
    Object.keys(log).forEach((key) => {
      text += `${key}: ${log[item]}\n`
    })
  } else {
    text = log
  }
  writeLog(accessWriteStream, log)
}

module.exports = {
  access,
}
