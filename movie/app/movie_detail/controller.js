'use strict';
;(function(angular){
	var detail = angular.module('moviecat.movie_detail',[
		'ngRoute',
		'moviecat.services.http'
	]);
	
	detail.config(['$routeProvider',function($routeProvider){
		console.log('进入次模块detail路由匹配');
		$routeProvider.when('/detail/:id',{
			templateUrl : 'movie_detail/view.html',
			controller : 'movieDetailController'
		})
	}]);
	
	detail.controller('movieDetailController',[
		'$scope',
		'$route',
		'$routeParams',
		'HttpService',
		'AppConfig',
		function($scope,$route,$routeParams,HttpService,AppConfig){
			$scope.movie = {};
			$scope.movie.title = 'Loading...';
			$scope.loading = true;
			console.log(AppConfig)
			HttpService.jsonp(AppConfig.detailApiAddress + $routeParams.id,
				function(data){
					console.log(data);
					$scope.$apply(function(){
						$scope.movie = data;
						console.log(data.aka[0]);
						$scope.movie.title = data.aka[0];
						$scope.loading = false;
					})
		})
	}]);
	
})(angular)
