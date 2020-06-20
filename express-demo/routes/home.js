const express = require('express')
const router = express.Router()

const PROXY = require('express-http-proxy')

// 需要注意的是在使用路由middleware时它的执行位置
// 必须在routes之前,否则根本不会执行
router.use((req, res, next) => {
  console.log('所有home路由都会触发这个中间件')
  // 结束这个middleware中间件流程
  next()
})


// 路由匹配
router.get('/', (req, res, next) => {
  // request('http://www.tcl.com/api/html/footer', (error, response, body) => {
  //   res.send(body)
  // })
  res.send('aab')
  // 执行send之后不会再执行后面的函数了
  console.log('++++++++++++++++')
  next()
}, (res) => {
  console.log('----------------')
})

module.exports = router
