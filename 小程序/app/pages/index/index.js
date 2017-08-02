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
    },
    productList : []
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var vm = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
    	console.log('user')
      //更新数据
      vm.setData({
        userInfo:userInfo,
        productList : [
      		{ name : 'vue' },
      		{ name : 'react' },
      		{ name : 'angular' }
    		],
      })
    })
  },
  onShow : function(){
    console.log('show');
  },
  changeProduct : function(e){
    var wx = this;
    console.log(wx)
    // vm.setData({
    //   productList : [
    //   		{ name : 'vue' },
    //   		{ name : 'react' },
    //       { name : 'angular' },
    //       { name : 'Rx.js' }
    // 		],
    // });

    wx.data.productList.push( { name : 'Rx.js' });
    wx.setData({
      productList : wx.data.productList
    })
  },
  onPullDownRefresh : function(){
    var wx = this;
    wx.setData({

    })
  }

})
