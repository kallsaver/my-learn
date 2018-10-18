// 这个文件是程序的入口文件

const express = require('express')
const path = require('path')
const logger = require('morgan')
const ejs = require('ejs')
const app = express()
const partials = require('express-partials')

// express默认使用jade模板
// 使用ejs作为模板引擎
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

// 使用html作为模板
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'html')

// 如果没有写文件后缀,则默认的后缀是html
app.engine('html', ejs.__express)

// https://segmentfault.com/a/1190000002620309
// layout作为默认输出目录
app.use(partials())

// 首页路由
const homeRouter = require('./routes/home')

// 用户个人中心路由
const userRouter = require('./routes/user')

// 所有的应用程式都要走这个中间件
app.use((req, res, next) => {
  console.log('所有的路由都要走这个中间件')
  next()
})

// use是express中间件的意思
// 将路由套用至应用程式
app.use('/home', homeRouter)
app.use('/user', userRouter)

// 默认跳转home
app.use('/', (req, res, next) => {
  res.redirect('/home')
  next()
})

module.exports = app
