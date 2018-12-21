/*
 * @Author: kallsave
 * @Date: 2018-12-20 10:26:36
 * @Last Modified by: kallsave
 * @Last Modified time: 2018-12-20 17:27:58
 */

const express = require('express')
const router = express.Router()
const config = require('../config/index')
const url = require('url')

const proxy = require('express-http-proxy')

console.log(config.host + config.port)
router.get('/*', proxy(config.host + config.port, {
  intercept: function (rsp, data, req, res, callback) {
    res.render('usercenter/index.html', {
      // 不使用layout默认模板
      layout: false,
      list: ['vue']
    })
  }
}))

module.exports = router
