/*var jsDiv;
function run(){
	alert("run")
}
*/
angular.module("myApp",["ionic"])

angular.module("myApp").config(function($stateProvider,$urlRouterProvider){
	$stateProvider
	.state("home",{
		url:"/home",
		templateUrl:"views/home/home.html"
	})
	.state("product",{
		url:"/product",
		templateUrl:"views/product/product.html",
		controller:"product"
	})
	$urlRouterProvider.otherwise("/home")
})

.controller("myCtrl",function($scope,$state){
	
})

.directive("load",function($http,$state){
	return {
		restrict:"E",
		replace:false,
		transclude:false,
		templateUrl:"replace.html",		//地址以index页面为标准
		scope:{//templateUrl的控制器中的$scope
			back:"="
		},
		controller:function($scope){//templateUrl的控制器
			$scope.run=function(){
				alert(456)
			}
			$scope.name="replace"
		},
		
		link:function(scope,element,attr,controller,transclude){
			//scope是templateUrl的控制器中的$scope 
			//element是templateUrl这个对象  里面有replace页面的所有DOM元素
			//console.log(element)
			//从replace页面找到button这个按钮  它是一个jq对象
			var button=element.find("button").eq(0);
			//console.log(button)
			button.on("click",function(){
				scope.back();
			})
			//从replace页面找到div这个按钮 		replace.html页面只要一个<button>用来实现跳转功能和一个<div>用来装H5页面的内容
			var div=element.find("div").eq(0)
			//通过ajax请求得到H5.html的内容  这些内容是string数据类型  把它加在replace.html页面的<div>里
			//之所以这样做  而不是加在
			$http.get("H5.html").success(function(_data){
				div.html(_data)
			})
			
			var jsDiv=element.find("div")[0];
			//console.log(jsDiv)
		}
	}
})

