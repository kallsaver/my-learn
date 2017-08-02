var douban = require('../../comm/script/fetch')
var config = require('../../comm/script/config')
// 拿到app.js里面的实例
var app = getApp()
Page({
    data : {
        films : [],
        hasMore: true,
		showLoading: true,
        start: 0,
        bannerList: config.bannerList
    },
    onLoad : function(){
        var that = this
        console.log('onload')
        // 顶部的加载动画
        wx.showNavigationBarLoading()
        // 在getCity函数中成功请求城市后再执行回调函数
        app.getCity(function(){
            wx.hideNavigationBarLoading()
            // 动态设置当前页面的标题
            wx.setNavigationBarTitle({
				title: '正在热映 - ' + config.city
            })
            // douban.fetchFilm这个函数是doubar这个对象的,第三个参数count是默认的config.count
            // 之所以要使用call是因为函数用了this,需要在这个实例使用setData
            douban.fetchFilms.call(that, config.apiList.popular, that.data.start)
        })
    },
    onPullDownRefresh : function(){
        // 下拉刷新
        console.log('下拉')
    },
    pullUpLoad: function( e ) {
        console.log('上拉')
    },

})