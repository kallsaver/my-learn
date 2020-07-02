const koa = require('../../plugins/koa/index')
const router = koa.Router()
const send = require('send')
const path = require('path')

router.get('/login', (req, res, next) => {
  send(req, path.join(__dirname, '../../views/login.html')).pipe(res)
})

module.exports = router
