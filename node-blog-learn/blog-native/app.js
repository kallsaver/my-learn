const querystring = require('querystring')
const blogRouterHandler = require('./src/router/blog')
const userRouterHandler = require('./src/router/user')

// 获取post请求的data
const getPostData = (req) => {
  return new Promise((resolve) => {
    if (req.method !== 'POST' ||
      req.headers['content-type'] !== 'application/json') {
      resolve({})
    } else {
      let postData = ''
      req.on('data', (chunk) => {
        // buffer转成utf-8字符串
        postData += chunk.toString()
      })
      req.on('end', () => {
        if (!postData) {
          resolve({})
        } else {
          resolve(JSON.parse(postData))
        }
      })
    }
  })
}

const serverHandler = (req, res) => {
  const url = req.url
  const path = url.split('?')[0]
  const paramPath = url.split('?')[1]

  // node通过req,res来传参
  // 这样做其实很不好,混淆和原先存在的属性和扩展的属性
  req.path = path
  req.query = querystring.parse(paramPath)

  getPostData(req).then((postData) => {
    // 扩展的
    req.body = postData

    const blogData = blogRouterHandler(req, res)

    if (blogData) {
      // 设置响应头
      res.setHeader('content-type', 'application/json')
      // http只能传输字符串
      res.end(JSON.stringify(blogData))
      return
    }

    const userData = userRouterHandler(req, res)

    if (userData) {
      // 设置响应头
      res.setHeader('content-type', 'application/json')
      // http只能传输字符串
      res.end(JSON.stringify(userData))
      return
    }

    // 未命中路由
    res.writeHead(404, {
      'content-type': 'text/html;charset=utf-8'
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
                  <div>404 Not found</div>
                </body>
              </html>
            `
    res.write(html)
    res.end()
  })
}

module.exports = serverHandler
