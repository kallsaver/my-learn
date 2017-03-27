/*define(['jquery'],function($){
	var a = {product : []};
	console.log("b.js运行")
	$.ajax({
		type:"get",
		url:"http://api.douban.com/v2/movie/in_theaters",
		async:true,
		dataType : "jsonp",
		success : function(data){
			console.log(data);
			a.product = data;
		}
	});
	return a ;
});*/

//用法2: //依赖的模块,工厂方法
/*define(['require','exports','jquery'],function(require,exports,$){
	//exports的意思是define的回调函数是一个工厂方法,如果开发者没有return一个单例对象,那么定义在exports一样的效果
	exports.name = 'bbb';
	//利用require可以拿到其它模块的方法
	var underscore = require('underscore');
	console.log(underscore);
	console.log($('div'))
})*/

//用法3: 直接返回一个数据
/*define({
	name : 'bbb'
})*/

//用法4:强烈推荐这种用法
define(function(require,exports){
	console.log("b.js运行")
	var $ = require('jquery');
	setTimeout(function(){
		console.log("bbbb")
	},2000)
	console.log($);
	var data = [1,2,3]
	exports.name = 'bbb';
	exports.data = data;
})
