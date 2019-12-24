process.env.NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV : 'development'

const path = require('path')
const express = require('express')
const rm = require('rimraf')
const config = require('./config')
const compile = require('./compile')
const proxy = require('http-proxy-middleware')

const host = config.host
const port = config.imgServerPort

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

const app = express()
app.use(express.static(resolve(config.cloudImgDir)))

app.listen(port, host, () => {
  console.log(`Images server running on http://${host}:${port}`)
})

const apiProxy = express()
const apiProxyPort = 8077
const apiHost = 'http://um.10get.com'
const proxyOptions = {
  target: apiHost,
  changeOrigin: true,
  ws: true,
  headers: {
    host: apiHost,
    origin: apiHost
  }
}
const proxyMiddleware = proxy(proxyOptions)

apiProxy.use('/cloud', proxyMiddleware)

apiProxy.listen(apiProxyPort, host, () => {
  console.log(`api proxy server running on http://${host}:${apiProxyPort}`)
})

rm(resolve(config.output), (err) => {
  if (err) {
    throw err
  }
  compile.dev()
})

