//原生跨域插件

;(function(window,document){
	var jsonp = function(url,options,callback){
			if(typeof options === 'function'){
				callback = options;
				options = {};
			}
			
			var cbFuncName = 'jsonp_cb' + Math.random().toString().replace('.','');

			window[cbFuncName] = (function(){
				return function(data){
					callback(data);

					window[cbFuncName] = undefined;

					var head = document.getElementsByTagName('head')[0];
					
     	 			var script = head.getElementsByTagName('script')[0];
     	 			
     	 			head.removeChild(script)
				};
			})();

			var queryString = url.indexOf('?') === -1 ? '?' : '&';
			
			for(var key in options){
				queryString += key + '=' + options[key] + '&' ;
			};

			queryString += 'callback=' + cbFuncName;

			var scriptElement = document.createElement('script');
			scriptElement.setAttribute('src', url+queryString);
			
			var head = document.getElementsByTagName('head')[0];
	        head.insertBefore(scriptElement,head.getElementsByTagName('script')[0]||null);
	}
	
	window.$jsonp = jsonp;
	
	return jsonp;
	
})(window,document);
