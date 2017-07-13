//index.html的点击a标签相当于输入函数的参数,而app.js和controller是函数
;(function(angular){
  'use strict';
  
	//moviecat.services.http此模块依赖注入moviecat.movie_list,moviecat.movie_list模块依赖注入主模块
  var module = angular.module('moviecat.movie_list',[
  	'ngRoute',
  	'moviecat.services.http'
  ]);
  //配置模块的路由
  module.config(['$routeProvider',function($routeProvider){
  	console.log('进入次模块list的路由配置执行')
  	//这时候的路由不是写死的,即一个变量,可以储存字符串,分别保存在$routeParmas.category和$routeParmas.page上
    $routeProvider.when('/:category/:page',{
      templateUrl : 'movieList/view.html',
      controller : 'movieListCtrl'
    })
  }]);
	
	//注入之后,HttpService这个函数才会运行,并且在controller的回调函数之前执行
	//angular的脏检查刷新页面机制,
  module.controller('movieListCtrl',[
   '$scope',
   '$route',
 	 'HttpService',
 	 '$routeParams',
 	 'AppConfig',
 	 '$location',
 	 function($scope,$route,HttpService,$routeParams,AppConfig,$location){
 	 		//每次执行$route.updateParams()方法,ng-view的controller里面的代码都会执行一遍
 	 		//url跳转默认路由=>page拿到$routeParams.page=>ng-view拿到template=>请求豆瓣API的数据=>ng-view渲染
 	 		//点击下一页=>currentPage++=>model层$routeParams.page++=>
 	 		//view层url输出框$routeParams.page++=>路由配置的controller重新执行
 	 		//console.log(1111);
  		var page = parseInt($routeParams.page);
  		//console.log(page);
  		var count = AppConfig.pageSize;
  		var start = (page - 1)* count;
  		$scope.loading = true;
  		$scope.totalCount = 0;
  		$scope.totalPage = 0;
  		$scope.subjects = [];
  		$scope.currentPage = page;
  		$scope.message = '';
  		$scope.title = 'Loading...';
  		//console.log($route);
			//console.log($location)
			//HttpService是自己写跨域,在模块http.js中
			//因为这个项目的url设计和豆瓣提供的API的url同步了,
			//url的输入框就是个input框,手动改变url地址,angular内部的路由模块监听了hash路由的变化,model层的数据也会变化,
			//这个监听回调函数就包括了路由的controller,所以controller会重新执行
			//这就是为什么$route.updateParams方法执行后,路由的controller会重新执行会重新执行的原因
			//hash路由变化=>触发了监听hash路由的回调函数=>controller执行=>视图变化
			//如果手动改变的url地址刚好符合豆瓣API提供的地址,比如http://localhost:3000/#/search/1,会成功请求
			//因为手动输入url相当于调用$route.updateParams的方法,把search给/:category,1给/:page
			//主要是豆瓣API设计得好 :http://api.douban.com/v2/movie/search?q={text},
			//并且在http://localhost:3000/#/top250/1?q=王晶,q是被设计无效的
			HttpService.jsonp(AppConfig.listApiAddress + $routeParams.category,
				//这里的数据来源:1.路由规则配置:/(model层,并且不会表现到url输入框中)2.url输入框?后面取(view层)
				{start:start,count:count,q:$routeParams.q},
				function(data){
					// 因为异步执行的原因,angular的数据绑定在异步拿到数据时已经绑定完成
					// 所以这里要设置$scope.subjects的脏检查
					// angular自带的$http等异步操作不需要用$scope.$apply,因为已经自带脏检查了,如果使用会报错
					// 不是angular封装好的异步操作需要用$scope.$apply
					$scope.$apply(function(){
						 $scope.title = data.title;
						 $scope.subjects = data.subjects;
						 $scope.loading = false ;
						 $scope.totalCount = data.total;
						 $scope.totalPage = Math.ceil($scope.totalCount / count);
			});
					
					$scope.go = function(page){
						if(page >= 1 && page <= $scope.totalPage){
							//这里非常重要,很强大
							//$route.updateParams()会让url更新参数,ng-view的controller都会执行一遍
							$route.updateParams({ page: page });
						}
					}
			})
  }])

})(angular);
