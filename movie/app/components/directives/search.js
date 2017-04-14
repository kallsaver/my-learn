;(function(angular){
	'use strict';
	//使用directive封装search组件,在页面中可复用
	//这里的search模块只是改变了url的参数,豆瓣api的search设计得比较好,路由匹配规则是符合movie_list的,
	
	var search = angular.module('moviecat.directives.search',['ngRoute']);
	search.directive('search',['$route',function($route){
		return {
			restrict : 'AE',
			//{} = isolate, true = child , false = isEqual
			scope : {}, 
			template : `<form class="navbar-form navbar-right" ng-submit="search()" 
					style="float:none !important;display:inline-block;margin:0 !important;width:calc(100% - 2px)!important;
					padding:0px !important">
            				<input type="text" class="form-control" placeholder="Search..." ng-model="input"
            				style="width:100% !important;">
          				</form>`,
          	replace : false,
          	link : function($scope,element,attrs,controller){
          		$scope.input = '';
          		$scope.search = function(){
					$route.updateParams({ category : 'search',page : 1 ,q : $scope.input })
          		}
          	}
		}
	}])
})(angular)
