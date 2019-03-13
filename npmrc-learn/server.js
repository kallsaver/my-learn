const http = require('http')

function getIPAddress () {
  let interfaces = require('os').networkInterfaces()
  for (let devName in interfaces) {
    let iface = interfaces[devName]
    for (let i = 0; i < iface.length; i++) {
      let alias = iface[i]
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address;
      }
    }
  }
}

const hostname = getIPAddress()
const port = 8089

const server = http.createServer((req, res) => {
  console.log(req)
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain')
  res.end('first\n')
}).listen(port)

console.log(`Server running at http://${hostname}:${port}/`)


