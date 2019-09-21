const handleBlogRouter = require('./src/router/blog')

const serverHandler = (req, res) => {
  const method = req.method
  const url = req.url
  const path = url.split('?')[0]

  console.log(path)

  const blogData = handleBlogRouter(req, res)
  console.log(blogData)
  if (blogData) {
    // 设置响应头
    res.setHeader('content-type', 'application/json')
    // http只能传输字符串
    res.end(JSON.stringify(blogData))
    return
  }

  // 未命中路由
  res.writeHead(404, { 'Content-type': 'text/plain;charset=utf-8'})
  res.write('404 Not Found')
  res.end()
}

module.exports = serverHandler
