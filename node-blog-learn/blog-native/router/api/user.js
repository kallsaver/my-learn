const express = require('../../plugins/express/index')
const router = express.Router()

const {
  getCookieExpires,
  createUserId,
} = require('../../utils/login')

const {
  userInfoGet,
} = require('../../controller/user')

const {
  redisSet,
  redisDel,
} = require('../../redis/index')

const {
  SuccessModel,
  ErrorModel,
} = require('../../model/res-model')

const loginMiddle = require('../../middleware/login')

// 登录操作
router.get('/login-in', async (req, res) => {
  const query = req.query

  const validate = { username, password } = query

  for (const key in validate) {
    if (!validate[key]) {
      const result = new ErrorModel(null, `${key} missing`)
      res.setHeader('Conent-Type', 'application/json')
      res.end(JSON.stringify(result))
      return
    }
  }

  const [err, ret] = await userInfoGet(username)
  if (err) {
    const result = new ErrorModel({}, err)
    res.setHeader('Conent-Type', 'application/json')
    res.end(JSON.stringify(result))
    return
  }
  const userInfo = ret
  if (userInfo.password !== password) {
    const result = new ErrorModel({}, '密码错误')
    res.setHeader('Conent-Type', 'application/json')
    res.end(JSON.stringify(result))
    return
  } else {
    const [err] = await redisSet(req.sessionId, userInfo)
    if (err) {
      const result = new ErrorModel({}, err)
      res.setHeader('Conent-Type', 'application/json')
      res.end(JSON.stringify(result))
      return
    }
    req.session = userInfo
    const result = new SuccessModel({
      username: ret.username
    }, '登录成功')
    res.setHeader('Conent-Type', 'application/json')
    res.end(JSON.stringify(result))
  }
})

router.get('/login-out', async(req, res) => {
  const sessionId = req.sessionId
  const [err] = await redisDel(sessionId)
  if (err) {
    const result = new ErrorModel({}, err)
    res.setHeader('Conent-Type', 'application/json')
    res.end(JSON.stringify(result))
    return
  }
  req.session = {}
  const result = new SuccessModel({}, '登出成功')
  res.setHeader('Conent-Type', 'application/json')
  res.end(JSON.stringify(result))
})

// 检查是否处于登录状态
router.get('/login-check', loginMiddle, async (req, res) => {
  const result = new SuccessModel({ isLogin: true }, '登录')
  res.setHeader('Conent-Type', 'application/json')
  res.end(JSON.stringify(result))
})

// 个人信息
router.get('/info', loginMiddle, async (req, res) => {
  const [err, ret] = await userInfoGet(req.session.username)
  if (err) {
    const result = new ErrorModel({}, err)
    res.setHeader('Conent-Type', 'application/json')
    res.end(JSON.stringify(result))
    return
  }
  const result = new SuccessModel(ret)
  res.setHeader('Conent-Type', 'application/json')
  res.end(JSON.stringify(result))
})

module.exports = router
