const express = require('express')
const router = require('./router/index')
const bodyParser = require('body-parser')

const app = express()

// 解析application/json
app.use(bodyParser.json())
// 解析application/x-www-form-urlencoded,并且用系统模块querystring来处理
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', router)

const server = app.listen(8045, () => {
  const { address, port } = server.address()
  console.log(address)
  console.log(`项目启动成功: http://localhost:${port}`)
})
