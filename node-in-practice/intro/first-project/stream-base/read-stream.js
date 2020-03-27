const fs = require('fs')

// 创建一个可读流,读取1.txt文件
const readStream = fs.createReadStream('input.txt')

// 设置数据编码为uft8
readStream.setEncoding('UTF8')

let data= ''

readStream.on('data', (chunk) => {
  console.log(chunk)
  data += chunk
})

readStream.on('end', () => {
  console.log(data)
})
