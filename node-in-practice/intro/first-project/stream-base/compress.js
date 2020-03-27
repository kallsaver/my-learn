const fs = require('fs')
const zlib = require('zlib')

// 压缩input.txt文件为input.txt.gz

fs.createReadStream('input.txt')
  .pipe(zlib.createGunzip())
  .pipe(fs.createWriteStream('input.txt.gz'))
