const http = require('http')
const { PORT } = require('../config/index')
const serverHandler = require('../app')

const server = http.createServer(serverHandler).listen(PORT)
