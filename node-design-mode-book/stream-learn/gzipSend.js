const fs = require('fs')
const zlib = require('zlib')
const http = require('http')
const path = require('path')
const file = process.argv[2]
const server = process.argv[3]

const options = {
  hostname: server || 'localhost',
  port: 3000,
  path: '/',
  method: 'PUT',
  headers: {
    'filename': path.basename(file),
    'Content-Type': 'application/octet-stream',
    'Content-Encoding': 'gzip'
  }
}

const req = http.request(options, (res) => {
  console.log(`sever response:' ${res.statusCode}`)
})

// 读
fs.createReadStream(file)
  // 压缩
  .pipe(zlib.createGzip())
  // 发送
  .pipe(req)
  .on('finish', () => {
    console.log('finish send')
  })




