const Koa = require('koa')
const app = new Koa()

const httpServer = require('http').Server(app.callback())

const io = require('socket.io')(httpServer)

io.listen(httpServer)

const middleware = require('./middleware/index')
const router = require('./router')

middleware(app)
router(app)

const port = 3333

httpServer.listen(port, () => {
  console.log(`app run at http://localhost:${port}`)
})

let number = 0

io.on('connection', (socket) => {
  console.log('初始化成功')

  socket.on('send message', (msg) => {
    console.log('来自客户端的消息' + msg)
    io.emit('get message', `来自服务端消息${++number}`)
  })

  // 失去连接
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})
