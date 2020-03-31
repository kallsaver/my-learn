/*
 * @Author: kallsave
 * @Date: 2018-12-20 10:26:36
 * @Last Modified by: kallsave
 * @Last Modified time: 2019-09-25 15:18:10
 */

const express = require('express')
const router = express.Router()
const proxy = require('express-http-proxy')

const config = require('../config/index')

console.log(config.host + config.port)
// router.get('/*', proxy(config.host + config.port, {
//   intercept: function (rsp, data, req, res, callback) {
//     res.render('usercenter/index.html', {
//       // 不使用layout默认模板
//       layout: false,
//       list: ['vue']
//     })
//   }
// }))

router.use('/*',
  proxy(config.serverHost, {
    // target: 'https://api.douban.com/',
    // changeOrigin: true,
    // forwardPath: function (req, res) {
      // return config.serverPrefix + '/productRegister/myProduct'
    // },
    intercept: function (rsp, data, req, res, callback) {
      // var _json = data.toString()
      // var json = JSON.parse(_json)
      // console.log(json)
      //
      res.cookie('express', 'test', { domain: '.tclo2o.cn', path: '/'});
      res.render('usercenter/index.html', {
        layout: false,
        list: ['vue']
      })
    }
  })
)



module.exports = router
