;(function(angular){
	angular.module('myApp')
	.controller('firstCtrl',fn);
	fn.$inject = ['$scope']
	function fn($scope){
		$scope.data = 'first'
	}
})(angular)
