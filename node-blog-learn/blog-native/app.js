const handleBlogRouter = require('./src/router/blog')

const serverHandler = (req, res) => {
  const method = req.method
  const url = req.url
  const path = url.split('?')[0]

  const data = handleBlogRouter(req, res)

  if (data) {
    // 设置响应头
    res.setHeader('Content-type', 'application/json')
    // http只能传输字符串
    res.end(JSON.stringify(data))
    return
  }
  // 未命中路由
  res.writeHead(404, {
    'Content-type': 'text/html;charset=utf-8'
  })
  let html = `<!DOCTYPE html>
                <html lang="en">
                  <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <meta http-equiv="X-UA-Compatible" content="ie=edge">
                    <title>Document</title>
                  </head>
                  <body>
                    <div>404ggg</div>
                  </body>
                </html>
              `
  res.write(html)
  res.end()
}

module.exports = serverHandler
