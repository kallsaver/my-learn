var douban = require('../../comm/script/fetch')
var util = require('../../util/util')
var config = require('../../comm/script/config')
Page({
    data: {
        filmDetail: {},
        showLoading: true,
		showContent: false,
		numbers : 0
    },
    onLoad : function(options){
		var that = this
		// 拿到url参数
		console.log(options)
		var id = options.id
		console.log('onload')
		douban.fetchFilmDetail.call(that,config.apiList.filmDetail,id,function(data){
			console.log('data',data);
			// 判断是否收藏,这是个异步接口
			// 收藏在本机而不是用户
			wx.getStorage({
				key : 'film_favorite',
				success : function(res){
					console.log('res',res)
					for(var i = 0; i < res.data.length; i++){
						if( res.data[i].id === data.id){
							console.log('找到了')
						}
					}
				}
			})

			// 存储浏览历史
			var date = util.getDate()
			var time = util.getTime()
			var film_history = []
			console.log('-----进入----')
		})
	},
	viewPersonDetail : function(e){
		var data = e.currentTarget.dataset;
		wx.redirectTo({
		  url: '../personDetail/personDetail?id=' + data.id
		})
	},
	onReady : function(){
		var that = this;
		// setInterval(function(){
		// 	that.setData({
		// 		numbers : ++that.data.numbers
		// 	})
		// },1000)
	},
	favoriteFilm : function(){
		console.log('ff')
	}
})