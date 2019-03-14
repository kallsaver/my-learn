const path = require('path')
const fs = require('fs')
const vm = require('vm')
const chalk = require('chalk')
const babel = require('babel-core')
const Promise = require('bluebird')
const morgan = require('morgan')
const Express = require('express')
const bodyParser = require('body-parser')
const { rootDir, devPort, devIp } = require('./utils')

const transform = Promise.promisify(babel.transformFile)
let app

async function mockServer({ port = devPort }) {
  if (app) {
    app.kill('SIGTERM')
  }

  app = new Express()

  app.use(morgan(chalk`{cyan [:method]} {gray :url} {green :status} :response-time ms - :res[content-length]`))
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({
    extended: false
  }))
  app.use((req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*')
    res.set('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')

    next()
  })

  app.all('/*', (req, res) => {
    const mockPath = path.join(rootDir, path.join('mock/', `${req.path}.js`))
    const jsonPath = path.join(rootDir, path.join('mock/', `${req.path}.json`))

    let promise
    if (fs.existsSync(mockPath)) {
      promise = transform(mockPath).then((result) => {
        const sandbox = {
          module: {},
          exports: {},
          global: global,
          cwd: () => path.join(process.cwd(), './mock'),
          require: require
        }

        Object.assign(sandbox, global)
        let value = {}
        try {
          value = vm.runInNewContext(result.code, sandbox)

          if (typeof value === 'function') {
            return value(req)
          }
        } catch (e) {
          console.log(chalk`{red [ERROR]} ${JSON.stringify(e)}`)
        }

        return value
      })
    } else if (fs.existsSync(jsonPath)) {
      const json = fs.readFileSync(jsonPath)
      try {
        const res = JSON.parse(json)
        promise = Promise.resolve(res)
      } catch (e) {
        console.log(chalk`{red [ERROR]} mockServer JSON.parse ${e}`)
      }
    } else {
      promise = Promise.reject(new Error(`Not Found ${req.path}`))
    }

    promise.then((ret = {}) => {
      if (ret.$$header) {
        Object.keys(ret.$$header).forEach((key) => {
          res.setHeader(key, ret.$$header[key])
        })
      }

      const delay = ret.$$delay || 0
      const cookie = ret.$$cookie
      const clearCookie = ret.$$clearCookie

      if (cookie) {
        Object.keys(cookie).forEach(key => {
          if (key) {
            const obj = cookie[key] || {}
            const value = typeof obj === 'string' ? obj : (obj.value || '')
            const options = obj.options
            res.cookie(key, value, Object.assign({
              domain: req.hostname,
              path: '/'
            }, options))
          }
        })
      }

      if (Array.isArray(clearCookie)) {
        clearCookie.forEach(obj => {
          res.clearCookie(typeof obj === 'string' ? obj : obj.name, obj.options)
        })
      }

      delete ret.$$header
      delete ret.$$delay
      delete ret.$$cookie
      delete ret.$$clearCookie

      return Promise.delay(delay, ret)
    }).then((ret) => {
      if (req.query.callback) {
        res.jsonp(ret)
      } else {
        res.send(ret)
      }
    }).catch((err) => {
      res.status(500).send({
        code: 1,
        error: (err || {}).stack || err
      })
    })
  })

  app.listen(port, () => {
    console.log(chalk`{gray [mock-server]} {green started} at {blue.underline http://${devIp}:${port}}`)
  })

  return app
}

process.on('exit', () => {
  if (app) {
    app.kill('SIGTERM')
  }
})

if (!module.parent) {
  mockServer({ port: devPort })
} else {
  module.exports = (port = devPort) => mockServer(port)
}
