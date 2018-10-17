const express = require('express')
const router = express.Router()
const utils = require('../helpers/utils')

// 验证路由参数的中间件,这个中间件会在use中间件之前执行
router.param('id', (req, res, next, id) => {
  console.log('触发user路由的param中间件')
  console.log(id)
  if (/^[0-9]+$/.test(id)) {
    // 在下一个流程中,req.name = 'pp'
    // express的传值通过这种方式
    req.name = 'pp'
    req.id = id
  }
  next()
})

// 需要注意的是在使用路由middleware时它的执行位置
// 必须在routes之前,否则根本不会执行
router.use('/:id', (req, res, next) => {
  console.log('触发user路由的use中间件')
  // 结束这个middleware中间件流程
  console.log(req.name)
  next()
})

router.get('/:id', (req, res, next) => {
  console.log(req.name)
  if (!req.id) {
    res.render('404', { title: 'Express' })
  } else {
    res.send('id=' + req.params.id)
  }
})


module.exports = router
