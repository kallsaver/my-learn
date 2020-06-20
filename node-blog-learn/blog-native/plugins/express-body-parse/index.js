function bodyParse() {
  return function (req, res, next) {
    if (req.method !== 'POST' || req.headers['content-type'] !== 'application/json') {
      next('not post')
    } else {
      let postData = ''
      req.on('data', (chunk) => {
        // buffer转成utf-8字符串
        postData += chunk.toString()
      })
      req.on('end', () => {
        req.body = !postData ? {} : JSON.parse(postData)
        next()
      })
    }
  }
}

module.exports = bodyParse
