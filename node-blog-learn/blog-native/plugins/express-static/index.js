const fs = require('fs')
const url = require('url')
const path = require('path')
const mime = require('mime2')
const send = require('send')

function static(root, options = {}) {

  const fallthrough = options.fallthrough || true

  root = path.resolve(root)

  return function (req, res, next) {

    const pathname = url.parse(req.url).pathname

    if (req.method !== 'GET' || pathname === '/') {
      next()
      return
    }

    const filename = path.join(root, pathname)

    fs.stat(filename, (err, stat) => {
      if (err) {
        if (fallthrough) {
          next()
          return
        }
        next(err)
        return
      }
      const type = mime.lookup(filename)
      res.setHeader('Content-Type', type)
      fs.createReadStream(filename).pipe(res)
    })
  }
}

module.exports = static
