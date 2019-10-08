const {
  loginCheck
} = require('../controller/user')

const {
  SuccessModel,
  ErrorModel
} = require('../model/res-model')

const userRouterHandler = (req, res) => {
  const method = req.method
  const path = req.path
  if (method === 'POST') {
    if (path === '/api/user/login') {
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
