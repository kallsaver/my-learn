const fs = require('fs')
const path = require('path')

// let src = './source/1.txt'
let src = path.join(__dirname, './source/1.txt')

// 读取一个文件的内容
fs.readFile(src, {
  // 默认'buffer'
  encoding: 'utf8'
}, function (err, data) {
  if (err) {
    throw err
  }
  console.log(data)
  console.log(typeof data)
})
