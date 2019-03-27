const fs = require('fs')
const path = require('path')

let src = path.join(__dirname, './source')

// 读取目录中的所有文件/目录
// fs.readdir(src, function (err, paths) {
//   if (err) {
//     throw err
//   }
//   console.log(paths)
// })

fs.readdir(src, {
  // 默认utf8
  encoding: 'utf8'
}, function (err, paths) {
  if (err) {
    throw err
  }
  console.log(paths)
})

