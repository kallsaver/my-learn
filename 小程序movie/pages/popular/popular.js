var douban = require('../../comm/script/fetch')
var config = require('../../comm/script/config')
var app = getApp()
Page({
    data : {
        films : [],
        hasMore: true,
		showLoading: true,
		start: 0,
    },
    onLoad : function(){
        var that = this;
        console.log('onload');
        wx.showNavigationBarLoading()
    }
})