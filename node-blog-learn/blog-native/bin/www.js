const http = require('http')
const portfinder = require('portfinder')

const PORT = 8067

const serverHandler = require('../app')

const server = http.createServer(serverHandler)

let findPort = new Promise((resolve, reject) => {
  portfinder.basePort = PORT
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      resolve(port)
    }
  })
})

findPort.then((port) => {
  server.listen(port)
  console.log(`listen in localhost:${port}`)
})
