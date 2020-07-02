const koa = require('../../plugins/koa/index')
const router = koa.Router()

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
      res.body = new ErrorModel(`${key} missing`)
      return
    }
  }

  const [err, ret] = await userInfoGet(username)
  if (err) {
    res.body = new ErrorModel(err)
    return
  }
  const userInfo = ret
  if (userInfo.password !== password) {
    res.body = new ErrorModel('密码错误')
    return
  } else {
    const [err] = await redisSet(req.sessionId, userInfo)
    if (err) {
      res.body = new ErrorModel(err)
      return
    }
    req.session = userInfo
    res.body = new SuccessModel({
      username: ret.username
    }, '登录成功')
  }
})

router.get('/login-out', async(req, res) => {
  const sessionId = req.sessionId
  const [err] = await redisDel(sessionId)
  if (err) {
    res.body = new ErrorModel(err)
    return
  }
  req.session = {}
  res.body = new SuccessModel({}, '登出成功')
})

// 检查是否处于登录状态
router.get('/login-check', loginMiddle, async (req, res) => {
  res.body = new SuccessModel({ isLogin: true }, '登录')
})

// 个人信息
router.get('/info', loginMiddle, async (req, res) => {
  const [err, ret] = await userInfoGet(req.session.username)
  if (err) {
    res.body = new ErrorModel(err)
    return
  }
  res.body = new SuccessModel(ret)
})

module.exports = router
