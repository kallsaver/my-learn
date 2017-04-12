//'use strict';

// Declare app level module which depends on views, and components
// 需要注意的是angular的模块注入顺序也是模块的执行顺序,而不是src的引入顺序
// 在路由movie_detail和movie_list匹配顺序中得到体现
angular.module('moviecat', [
  'ngRoute',
  'moviecat.movie_detail',
  'moviecat.movie_list',
  'moviecat.directives.auto_focus',
  'moviecat.directives.search',
])

.constant('AppConfig', {
    pageSize: 10,
    listApiAddress: 'http://api.douban.com/v2/movie/',
    detailApiAddress: 'http://api.douban.com/v2/movie/subject/'
})

.config(['$routeProvider', function($routeProvider) {
	console.log('主模块路由配置执行');
  $routeProvider.otherwise({redirectTo: '/in_theaters/1'});
}])

.controller('NavController',[
	'$scope',
	'$routeParams',
	'$location',
	
	function($scope,$routeParams,$location){
		//console.log('navCtrl');
		//console.log($routeParams);            //{category:'in_theaters',page:1} //异步的console.log
		//undefined,因为ng-view的controller是在异步任务(拿到template)后执行,$routeParams.category也是这时候生效
		//console.log($routeParams.category);   
		//console.log($location.path());        //url#后面的东西
		$scope.location = $location;
		//注意这里是location.path();而不是locationPath,如果$scope.locationPath=$location.path()
		//那么这个值是不会改变的了,所以我们要传进去一个可变的值;
		$scope.$watch('location.path()',function(newValue,oldValue,$scope){
				console.log(newValue);
//				if(newValue.startsWith('/in_theaters')){
//					$scope.type = 'in_theaters';
//				}
//				else if(newValue.startsWith('/coming_soon')){
//					$scope.type = 'coming_soon';
//				}
//				else if(newValue.startsWith('/top250')){
//					$scope.type = 'top250';
//				}
				//console.log($scope.type)
		})
}])

.controller('SearchController',[
	'$scope',
	'$route',
	'AppConfig',
	function($scope,$route,AppConfig){
		$scope.input = '';
		$scope.search = function(){
				//console.log($scope.input);
				$route.updateParams({ category : 'search',page : 1 ,q : $scope.input })
		}
}])
