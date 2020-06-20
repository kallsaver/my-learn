const {
  ErrorModel,
  SuccessModel,
} = require('../model/res-model')

function checkLogin(req) {
  if (!req.session.username) {
    return false
  }
  return true
}

function loginMiddle(req, res, next) {
  const isLogin = checkLogin(req)
  if (!isLogin) {
    const result = new SuccessModel({}, '未登录', -1)
    res.setHeader('content-type', 'application/json')
    res.end(JSON.stringify(result))
    return
  }
  next()
}

module.exports = loginMiddle
