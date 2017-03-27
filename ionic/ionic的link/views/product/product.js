

angular.module("myApp").controller("product",function($scope,$state,$ionicScrollDelegate){
	$scope.goHome=function(){
		$state.go("home");
	}
})