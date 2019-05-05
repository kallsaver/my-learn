const querystring = require('querystring')

const serverHandler = (req, res) => {
  const method = req.method
  const url = req.url
  const path = url.split('?')[0]
  const query = querystring.parse(url.split('?')[1])

  // 设置返回格式为JSON
  res.setHeader('content-type', 'application/json')

  const resData = {
    name: 'a'
  }

  console.log(method)

  res.end(JSON.stringify(resData))

}

module.exports = serverHandler
