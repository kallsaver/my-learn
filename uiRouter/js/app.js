

;(function(angular){
	var model = angular.module('myApp',['ui.router']);
	
	model.config(function($stateProvider,$urlRouterProvider,$locationProvider){
		//1.6版本路径会出现'!'
		//解决办法:http://blog.csdn.net/u014291497/article/details/54427103
		$locationProvider.hashPrefix('');
		$stateProvider
		.state('first',{
			url : '/',
			templateUrl : 'views/first/first.html',
			controller : 'firstCtrl'
		})
		.state('home',{
			url : '/home',
			templateUrl : 'views/home/home.html',
			//或者在js的controller中改
			controller : function($state){
				$state.go('home.on')
			}
			
		})
		.state('home.on',{
			url : '/home/on',
			templateUrl : 'views/home/on.html'
		})
		.state('home.in',{
			url : '/home/in',
			templateUrl : 'views/home/in.html'
		})
		.state('home.comming',{
			url : '/home/comming',
			templateUrl : 'views/home/comming.html'
		})
		.state('about',{
			url : '/about',
			templateUrl : 'views/about/about.html'
		});

		
		$urlRouterProvider.otherwise('/')
	});
	
	
	model.controller('worksheet0Ctrl', worksheet0Ctrl);
	worksheet0Ctrl.$inject = ['$state','$timeout','$scope'];
	function worksheet0Ctrl($state,$timeout,$scope) {
		console.log($scope === this)    //false
		var vm=this;
		console.log(vm);
		console.log($scope)
		vm.data = '豆瓣电影';
		vm.other = 'other';
		vm.first = 'First';
		vm.home = 'Home';
		vm.about = 'About';
		
		//$apply主要用于异步的操作,因为setTimeout,ajax请求,setInterval这些都是异步操作
		//$apply的场景用于在angular同步渲染完成后,异步数据(不仅仅是$scope下的数据)的更新
		//而$watch比$apply的更好用,但是$watch只能监控$scope下的数据,一旦这个监控数据变化
		//$watch的回调函数立刻执行
		setInterval(function(){
			$scope.$apply(function(){
				//不仅仅是$scope的数据,vm或者其他的都可以
				vm.data = new Date();
			})
		},1000)
		//$scope.$watch只能监控$scope下的数据,abc应该是 $scope.abc
		$scope.$watch('abc',function(newvalue,oldvalue){
			console.log(newvalue,oldvalue);
		})
		
		
	}
})(angular)
