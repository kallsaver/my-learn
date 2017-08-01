//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    a : 1,
    b : 2,
    item : {
      index: 0,
      msg: 'this is a template',
      time: '2016-09-15'
    }
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
    	console.log('user')
      //更新数据
      that.setData({
        userInfo:userInfo,
        productList : [
      		{ name : 'vue' },
      		{ name : 'react' },
      		{ name : 'angular' }
    		],
      })
    })
  }
})
