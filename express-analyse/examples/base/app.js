const express = require('../../index')

const app = express()

// 首页路由
const homeRouter = require('./routes/home')

app.use('/home', homeRouter)
