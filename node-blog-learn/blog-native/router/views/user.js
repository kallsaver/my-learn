const express = require('../../plugins/express/index')
const router = express.Router()
const send = require('send')
const path = require('path')

router.get('/login', (req, res, next) => {
  send(req, path.join(__dirname, '../../views/login.html')).pipe(res)
})

module.exports = router
