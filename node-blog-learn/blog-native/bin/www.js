const http = require('http')
const { PORT } = require('../config/index')
const app = require('../app')
// const send = require('send')

const server = http.createServer(app).listen(PORT)

// const server = http.createServer((req, res) => {
//   send(req, './public/static/umd.js').pipe(res)
// }).listen(PORT)
