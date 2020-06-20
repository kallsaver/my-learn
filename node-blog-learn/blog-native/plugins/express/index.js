const querystring = require('querystring')

// 设计像express一样的洋葱模型的执行顺序
function compose(middleware, ...rest) {
  dispatch(0, ...rest)
  function dispatch(i) {
    const fn = middleware[i]
    if (fn && typeof fn === 'function') {
      fn(...rest, function next() {
        dispatch(i + 1)
      })
    }
  }
}

function express() {
  function app(req, res) {
    setReq(req, res)
    const middleware = app.middleware
    compose(middleware, ...arguments)
  }

  function setReq(req, res) {
    const url = req.url
    const reqPath = url.split('?')[0]
    const paramPath = url.split('?')[1]
    req.reqPath = reqPath
    req.query = querystring.parse(paramPath)
  }

  app.middleware  = []

  app.use = function(expOrFn, fn) {
    if (typeof expOrFn === 'string') {
      fn.expOrFn = expOrFn
      app.middleware.push(fn)
    } else {
      app.middleware.push(expOrFn)
    }
  }

  return app
}

express.Router = function () {

  function router(req, res, next) {
    // 原生的
    const method = req.method
    // 扩展的
    const reqPath = req.reqPath

    if (method === 'GET') {
      for (const url in router.getMap) {
        const handler = router.getMap[url]
        const routerPath = router.expOrFn + url
        if (routerPath === reqPath) {
          compose(handler, req, res)
          return
        }
      }
    }

    if (method === 'POST') {
      for (const url in router.postMap) {
        const handler = router.postMap[url]
        const routerPath = router.expOrFn + url
        if (routerPath === reqPath) {
          compose(handler, req, res)
          return
        }
      }
    }

    next()
  }

  router.getMap = {}
  router.postMap = {}
  router.get = function (url, ...middleware) {
    this.getMap[url] = middleware
  }
  router.post = function (url, ...middleware) {
    this.postMap[url] = middleware
  }
  return router
}

function noMatchHandler(req, res) {
  // 未命中路由
  res.writeHead(404, {
    'content-type': 'text/html;charset=utf-8'
  })

  const html = `<!DOCTYPE html>
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
}

module.exports = express
