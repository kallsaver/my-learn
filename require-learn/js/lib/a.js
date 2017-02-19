//define两个参数,一个是需要引入的模板
//和angular的依赖注入一样
//如果省略第一个模块,就定义了一个匿名模块,模块名是路径名
define(['jquery'],function($){
	console.log('a.js运行');
	console.log($)
	setTimeout(function(){
		console.log("异步任务")		
	},5000)
	return {
		isEqual : function(a,b){
			return a === b;
		}
	}
})

