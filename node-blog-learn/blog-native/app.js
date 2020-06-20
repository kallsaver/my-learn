const path = require('path')
const send = require('send')

const express = require('./plugins/express/index')
const bodyParse = require('./plugins/express-body-parse/index')
const static = require('./plugins/express-static/index')

const blogApiRouter = require('./router/api/blog')
const userApiRouter = require('./router/api/user')
const testApiRouter = require('./router/api/test')

const userViewRouter = require('./router/views/user')

// 最简单的session就是node进程中的一个变量,占用内存,缺点是访问量大了会导致内部暴涨
// 通用方案是使用redis,不使用node进程,使用独立的进程
// const session = require('./session/index')

const app = express()

const {
  getCookieExpires,
  createSessionId,
} = require('./utils/login')

const {
  redisGet,
  redisSet,
} = require('./redis/index')

const {
  access
} = require('./utils/login')

app.use(bodyParse({}))

// 用nginx就不需要static处理了
app.use(static(path.join(__dirname, 'public')))

app.use(async (req, res, next) => {
  // favion.ico也被当做一次请求了
  if (req.url === '/favicon.ico') {
    res.end()
    return
  }
  access({
    method: req.method,
    url: req.url,
    'user-agent': req.headers['user-agent'],
    date: Date.now(),
  })
  next()
})

app.use(async (req, res, next) => {
  const cookie = {}
  const cookieString = req.headers.cookie || ''

  cookieString.split(';').forEach((item) => {
    if (!item) {
      return
    }
    const arr = item.split('=')
    const key = arr[0].trim()
    const val = arr[1].trim()
    cookie[key] = val
  })

  // 有几种方案: 1.登录后才颁发cookie 2.无论登录还是未登录都颁发cookie

  let sessionId = cookie.userId
  let session = {}

  // 第一次进来肯定没有sessionId
  if (!sessionId) {
    sessionId = createSessionId()
    const [err] = await redisSet(sessionId, {})
    if (err) {
      const result = new ErrorModel(null, err)
      res.setHeader('Conent-Type', 'application/json')
      res.end(JSON.stringify(result))
      return
    }
  } else {
    // 要检查下sessionId的有效性
    // 1.前端修改可能导致不可用
    // 2.已经过期了或登出
    // 3.退出应用重新进session已经断开
    const [err, ret] = await redisGet(sessionId)
    if (!ret) {
      // 说明seessionId失去有效性,要重新生成
      sessionId = createSessionId()
      const [err] = await redisSet(sessionId, {})
      if (err) {
        const result = new ErrorModel({}, err)
        res.setHeader('Conent-Type', 'application/json')
        res.end(JSON.stringify(result))
        return
      }
    } else {
      session = ret
    }
    // 说明是保持session的,是否是登录还得看val的值
    if (session.username) {
      console.log('登录了')
    }
  }

  req.sessionId = sessionId
  req.session = session
  req.cookie = cookie
  res.setHeader('set-cookie', `userId=${sessionId}; path=/; expires=${getCookieExpires()}; httpOnly;`)
  next()
})

// 没做路由匹配
app.use('/api/blog', blogApiRouter)
app.use('/api/user', userApiRouter)
app.use('/api/test', testApiRouter)

app.use('/user', userViewRouter)

app.use((req, res, next) => {
  send(req, path.join(__dirname, 'views/404.html')).pipe(res)
})

module.exports = app
