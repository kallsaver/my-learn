const express = require('express')
const boom = require('boom')
const userRouter = require('./user')

const router = express.Router()

router.use('/user', userRouter)

// 处理错误的中间件必须放在正常流程之后
router.use((req, res, next) => {
  // 继续传递给下个中间件,如果没有下个中间件,就使用默认方式
  next(boom.notFound('接口不存在'))
})

// 注意错误中间件有四个参数,第一个参数是err
router.use((err, req, res, next) => {
  const message = (err && err.message) || '系统错误'
  const statusCode = (err.output && err.output.statusCode) || 500
  const errorInfo = (err.output && err.output.payload && err.output.payload.error) || err.message
  res.status(statusCode).json({
    code: -1,
    message,
    errorCode: statusCode,
    errorInfo,
  })
})

module.exports = router
