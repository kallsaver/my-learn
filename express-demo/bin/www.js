// 这个文件基本不用改动,启动的基本文件
const app = require('../app')
const config = require('../config/index')
const http = require('http')

const port = process.env.PORT || config.port
app.set('port', port)

// 没有express的node原始写法
// const server = http.createServer((req, res) => {
//   res.writeHead(200, { 'Content-Type': 'text/html' })
//   res.write("holloe  world")
//   res.end()
// })

// function
console.log(typeof app)
// function(req, res, next) {}
console.log('app', app)
// function
console.log(app.use)

// app是一个函数
const server = http.createServer(app)

server.listen(port, onListening)
console.log('listen in localhost:' + port)

function onListening () {
  console.log('listening')
}

