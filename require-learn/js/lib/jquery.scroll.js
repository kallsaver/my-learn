//这种写法肯定是不符合AMD规范的,所以我们再入口配置把它转为规范的
;(function($){
	$.fn.scroll = function(){
		alert(1)
	}
	$.fn.ab = {name:"aaa"};
	//D = {name : 'ddd'}
})($)
