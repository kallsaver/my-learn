//这个js文件是处理跨域的

;(function(angular){
	var http = angular.module('moviecat.services.http',[]);
	//service其实是个AMD模块,分享可以使用return也可以用this
	http.service('HttpService',['$document',function($document){
		//console.log($document);
		//
		this.jsonp = (function(window,document){
				var jsonp = function(url,options,callback){
						if(typeof options === 'function'){
							callback = options;
							options = {}
						}
						
						var scriptElement = document.createElement('script');
						var head = document.getElementsByTagName('head')[0];
						var cbFuncName = 'jsonp_cb' + Math.random().toString().replace('.','');
			
						window[cbFuncName] = (function(){
							return function(data){
								callback(data);
			
								window[cbFuncName] = undefined;
			
			     	 			head.removeChild(scriptElement)
							};
						})();
			
						var queryString = url.indexOf('?') === -1 ? '?' : '&';
						
						for(var key in options){
							queryString += key + '=' + options[key] + '&' ;
						};
			
						queryString += 'callback=' + cbFuncName;
			
						
						scriptElement.setAttribute('src', url+queryString);
						
						
				        head.insertBefore(scriptElement,head.getElementsByTagName('script')[0]||null);
				}
				
				window.$jsonp = jsonp;
				
				return jsonp;
				
		})(window,$document[0]);
	}]);
})(angular);
