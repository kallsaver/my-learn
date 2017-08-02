//app.js
//app.js是配置全局变量的地方
var config = require('comm/script/config')
App({
  onLaunch: function() {
    // onLaunch方法执行之前,onLaunch同级的节点方法已经进入App
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // wx是个全局变量的api
    //console.log('wx',wx)
    // 这里的this是App,类似其他页面的page
    //console.log(this)
    var app = this
    // 获取用户信息
    app.getUserInfo()

  },
  globalData: {
    userInfo: null
  },
  getUserInfo:function(cb){
    var that = this
    wx.login({
      success: function (res) {
        // res.code在安卓是string,在苹果是number,所以用==
        //console.log('res.code',res.code)
        // 获取用户信息
        wx.getUserInfo({
          success: function (res) {
            // 更新初始化的全局数据
            that.globalData.userInfo = res.userInfo
            // 有name,city,gender等信息,res.userInfo是个对象
            //console.log('res.userInfo',res.userInfo)
            // 把用户信息(指针)传给回调函数
            typeof cb == "function" && cb(that.globalData.userInfo)
          }
        })
      }
    })
  },
  getCity : function(cb){
    var that = this
    wx.getLocation({
      // type为'gcj02'表示用微信内置的地图
      type : 'gcj02',
      success: function (res) {
        var locationParam = res.latitude + ',' + res.longitude + '1'
        wx.request({
          url: config.apiList.baiduMap,
          data: {
            ak: config.baiduAK,
            location: locationParam,
            output: 'json',
            pois: '1'
          },
          method: 'GET',
          success: function(res){
            // app.js和popular.js的config在作用域的位置环境是一样的,都是全局变量
            config.city = res.data.result.addressComponent.city.slice(0,-1)
            typeof cb == "function" && cb(res.data.result.addressComponent.city.slice(0,-1))
          },
          fail: function(res) {
            // 重新定位
            that.getCity();
          }
        })
      }
    })
  }
})
