const fs = require('fs')
const path = require('path')

const {
  SuccessModel,
  ErrorModel
} = require('../model/res-model')

const testRouterHandler = (req, res) => {
  const method = req.method
  const reqPath = req.reqPath

  if (method === 'GET') {
    if (reqPath === '/api/read') {
      return new Promise((resolve) => {
        const filePath = path.resolve(__dirname, '../public/data.txt')
        fs.readFile(filePath, {
          // 默认'buffer'
          encoding: 'utf8',
        }, (err, data) => {
          if (err) {
            console.log(err)
          }
          console.log(data)
          resolve(new SuccessModel(data))
        })
      })

    }
  }
}

module.exports = testRouterHandler
