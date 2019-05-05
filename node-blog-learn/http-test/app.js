const http = require('http')
const querystring = require('querystring')

const PORT = 8000

const server = http.createServer((req, res) => {
  const method = req.method
  const url = req.url
  const path = url.split('?')[0]
  const query = querystring.parse(url.split('?')[1])

  // 设置返回格式为JSON
  res.setHeader('content-type', 'application/json')

  console.log(method)

  // 返回的数据
  const resData = {
    method,
    url,
    path,
    query
  }

  if (method === 'GET') {
    res.end(JSON.stringify(resData))
  }

  if (method === 'POST') {
    let data = ''
    req.on('data', (chunk) => {
      // Buffer数据格式
      data += chunk.toString()
      // console.log(chunk)
    })
    req.on('end', () => {
      // 去掉空格符,转义符等等
      let postData = JSON.parse(data)
      resData.postData = postData
      // 返回
      res.end(JSON.stringify(resData))
    })
  }

})

server.listen(PORT)

console.log(`listen in localhost:${PORT} port`)
