const fs = require('fs')
const http = require('http')
const Websocket = require('ws')
const WebsocketServer = Websocket.Server

const PORT = 8087

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

const ws = new WebsocketServer({
  server: httpServer
})


