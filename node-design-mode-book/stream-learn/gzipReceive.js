const http = require('http')
const fs = require('fs')
const zlib = require('zlib')

const server = http.createServer((req, res) => {
  const filename = req.headers.filename
  console.log(`receive ${filename}`)
  // 接收,解压
  req.pipe(zlib.createGunzip())
  // 写入文件
  .pipe(fs.createWriteStream(filename, {
    encoding: 'utf8'
  }))
  .on('finish', () => {
    res.writeHead(201, {'Content-Type': 'text/plain'})
    res.end('finish receive')
    console.log('finish receive')
  })
})

server.listen(3000, () => {
  console.log('localhost: 3000')
})


