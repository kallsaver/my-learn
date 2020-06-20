const fs = require('fs')
const path = require('path')
const express = require('../../plugins/express/index')
const router = express.Router()

const {
  SuccessModel,
  ErrorModel,
} = require('../../model/res-model')

router.get('/read', (req, res) => {
  const filePath = path.resolve(__dirname, '../../public/static/data.txt')
  fs.readFile(filePath, {
    // 默认'buffer'
    encoding: 'utf8',
  }, (err, data) => {
    if (err) {
      console.log(err)
    }
    const result = new SuccessModel(data)
    res.setHeader('Conent-Type', type)
    res.end(JSON.stringify(result))
  })
})

module.exports = router
