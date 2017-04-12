;(function(angular){
	'use strict';
	
	var module = angular.module('moviecat.directives.auto_focus',[]);
	module.directive('autoFocus',['$location',function($location){
		return {
			restrict : 'A',
			link : function($scope,element,attrs,controller){
				console.log('autoFocus执行');
				//console.log(element);
				var aLink = element.children().attr('href');
				//console.log(aLink);
				//每个direactive的东西(除了事件监听),只执行一次,所以这个path是个固定值
				//var path = $location.path();
				//console.log(path);
				var type = aLink.replace(/\#(\/.+?)\/\d+/,'$1');
				console.log(type);
				$scope.location = $location;
				//路由模块的directive的执行顺序(至少config配置路由地址还没到异步的templateUrl)是第一的,
				//所以这里的$location是有值的,而$routeParmas.page是undefined的
				//console.log($location);
				//console.log($location.path()); 
				//angular自带的事件监听  $watch大法好
				$scope.$watch('location.path()',function(newValue,oldValue){
					//$watch会在初始化(link或者controller中给值)的时候执行一次,
					//加上if(newValue === oldValue){return}可以过滤第一次;本例中需要用到第一次的值,所以不过滤
					//当path发生变化时执行,所以
					//replace的提取'组'的语法
					//初始化时加上active的classname
					//
					element.parent().children().removeClass('active');
					if (newValue.startsWith(type)){
						//这里面有个有趣的问题,就是前两个元素addClass会在removeClass前面执行
						setTimeout(function(){
							element.addClass('active');	
						})
					};
				});
				
				
//				element.on('click',function(){
//					//注意这里是先执行click,路由的路径再跳转
//					console.log($location.path());
//					element.parent().children().removeClass('active');
//					element.addClass('active');
//				});
			}
		}
	}])
	
})(angular);
