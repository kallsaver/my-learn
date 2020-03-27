const fs = require('fs')

function write() {
  // 创建一个可以写入的流,写入文件output.txt
  const writeStream = fs.createWriteStream('output.txt')

  const data = '写入一些东西'

  // 开始写
  writeStream.write(data, 'UTF8')

  // 在结尾处写入
  // writeStream.end('end')

  writeStream.on('finish', () => {
    console.log('finish')
  })
}

function writeInputToOutPut() {
  const readStream = fs.createReadStream('input.txt')
  const writeStream = fs.createWriteStream('output.txt')
  // 读取input.txt的内容并写入output.txt
  readStream.pipe(writeStream)
}

writeInputToOutPut()
