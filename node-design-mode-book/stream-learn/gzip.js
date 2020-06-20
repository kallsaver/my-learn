const fs = require('fs')
const zlib = require('zlib')
const path = require('path')
const { on } = require('process')

// function resolvePath(dir) {
//   return path.join(__dirname, dir)
// }

// process.argv是个数组,分别是命令行以空格分隔的变量
// 比如node gzip.js xx
// 第一个参数是node所在的路径,第二个参数是gizp.js的路径
// 从第三个参数开始才算是自定义参数
const file = process.argv[2]

// 传统基于缓存实现的压缩文件,如果文件过大超过内存允许的最大值,就会报错
// fs.readFile(file, (err, buffer) => {
//   zlib.gzip(buffer, (err, buffer) => {
//     fs.writeFile(file + '.gz', buffer, (err) => {
//       console.log('success')
//     })
//   })
// })

// 用流的方式
fs.createReadStream(file)
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream(file + '.gz'))
  .on('finish', () => {
    console.log('finish')
  })
