const http = require('http')
const url = require('url')
const fs = require('fs')
// 获取一个socketIo实例
const socketIo = require('socket.io')

const PORT = 8088

const httpServer = http.createServer((req, res) => {
  fs.readFile(__dirname + req.url, (err, data) => {
    if (err) {
      console.log(err)
      return
    }
    res.writeHead(200, {
      'Content-Type': 'text/html'
    })
    res.write(data, 'utf8')
    res.end()
  })
})

httpServer.listen(PORT, () => {
  console.log(`localhost:${PORT}`)
})

// socketIo实例第一个参数是httpServer
const io = socketIo(httpServer)

const chat = io.of('/chat')

chat.on('connection', function (socket) {
  socket.emit('news', {
    name: 'ss'
  })
  socket.on('my other event', function (data) {
    console.log(data)
  })
  socket.on('disconnect', function () {
    console.log('disconnect')
  })
})




