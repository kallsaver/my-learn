const express = require('express')

const router = express.Router()

router.get('/login', (req, res) => {
  res.status(200).json({
    code: -1,
  })
})

module.exports = router
