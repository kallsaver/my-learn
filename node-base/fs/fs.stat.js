const fs = require('fs')

let src = './source/1.txt'

// 检查一个文件是否存在已经是否是文件/文件夹
fs.stat(src, function (err, stats) {
  if (err) {
    throw err
  } else {
    // 是否是文件
    console.log(stats.isFile())
  }
})
