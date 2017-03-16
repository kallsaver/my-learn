

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
	worksheet0Ctrl.$inject = ['$state','$timeout'];
	function worksheet0Ctrl($state,$timeout) {
		var vm=this;
		vm.data = '豆瓣电影';
		vm.lala = lala;
		function lala(){
			console.log(333);
		}
	}
})(angular)
