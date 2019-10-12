const {
  loginCheck
} = require('../controller/user')

const {
  SuccessModel,
  ErrorModel
} = require('../model/res-model')

const userRouterHandler = (req, res) => {
  const method = req.method
  const reqPath = req.reqPath
  if (method === 'POST') {
    if (reqPath === '/api/user/login') {
      const { username, password } = req.body
      const result = loginCheck(username, password)
      if (result) {
        return new SuccessModel()
      } else {
        return new ErrorModel()
      }
    }
  }
}

module.exports = userRouterHandler
