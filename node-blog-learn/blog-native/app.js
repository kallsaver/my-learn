const querystring = require('querystring')

const serverHandler = (req, res) => {

  // 设置返回格式为JSON
  res.setHeader('content-type', 'application/json')

}

module.exports = serverHandler
