//原生跨域插件

;(function(window,document){
	var jsonp = function(url,data,callback){
			// 1.挂载回调函数
			var cbFuncName = 'jsonp_cb' + Math.random().toString().replace('.','');
			//必须是全局函数,callback是我们希望在jsonp的回调函数中拿到数据
			window[cbFuncName] = (function(){
				return function(data){
					callback(data);
					//console.log('在异步之后执行');
					//删除这个全局函数
					window[cbFuncName] = undefined;
					//console.log(window[cbFuncName]);
					//删除生成的script标签
					var head = document.getElementsByTagName('head')[0];
     	 			var script = head.getElementsByTagName('script')[0];
     	 			head.removeChild(script)
				};
			})()
			
			// 2.将data转换为url字符串的形式
			// 比如{id:1,name:'aaa'} => id=1&name=aaa
	
			//如果插件使用者输入的是http://sss?的情况, 
			//如果插件使用者输入的是http://sss?id=1的情况
			//url解析时总是会把多余的&去掉
			//比如http://sss?id=1&&name:a&最终会变成http://sss?id=1&name:a
			var queryString = url.indexOf('?') === -1 ? '?' : '&';
			
			for(var key in data){
				queryString += key + '=' + data[key] + '&' ;
			}
			//大部分后端API的jsonp设计都是callback=拿到数据作为参数的回调函数名
			queryString += 'callback=' + cbFuncName;
			//console.log(queryString)
			// 3.创建一个script标签
			var scriptElement = document.createElement('script');
			scriptElement.setAttribute('src', url+queryString);
			
			var head = document.getElementsByTagName('head')[0];
	        	//insertBefore两个必填参数,一个是插入的元素,一个是该元素插入前面的位置节点
	        	//这一步一执行,window[cbFuncName]马上执行,即jsonp的回调函数执行
	        head.insertBefore(scriptElement,head.getElementsByTagName('script')[0]||null);
	        
	}
	
//	jsonp('http://api.douban.com/v2/movie/in_theaters',{count:2,start:1},function(data){
//		//执行的是window下的函数,这个回调函数是window下的回调函数
//		console.log(data)
//	})
	
	window.$jsonp = jsonp;
	
	//console.log('同步任务')
	
})(window,document)
