const http = require('http')

let httpServer = http.createServer((req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/html')
  res.end('ss')
})

httpServer.listen(3000, () => {
  console.log('http://106.13.52.209')
})
