


angular.module("starter.controllers")
.controller("HomeCtrl",function($scope,Product,$ionicSlideBoxDelegate){
	$scope.slides=[
		{
      		url: 'img/slide_1.jpg'
    	},
    	{
      		url: 'img/slide_2.jpg'
    	},
    	{
      		url: 'img/slide_3.jpg'
    	}
	]
	//console.log(Product.all())
	$scope.products=Product.all();
	
	/*$scope.nextSlide=function(){
		$ionicSlideBoxDelegate.previous();
	}*/
	
})

//不写这行代码的后果是<ion-side-menu>和<ion-nav-view>冲突  界面失去滑动效果,左菜单出不来
.controller('AuthCtrl', function($scope, $ionicHistory) {
    // hide back butotn in next view
    $ionicHistory.nextViewOptions({
      disableBack: true         //默认是false 会出现冲突的情况
    });
})

.controller('CategoryCtrl', function($scope, Product,Select) {
   $scope.products = Product.all();
   $scope.show=function(id){
		//在Product找到id相同的那项
		for(var i=0;i<$scope.products.length;i++){
			if($scope.products[i].id===id){
				Select[0]=$scope.products[i];
				break;
			}
		}
		
  }
})

.controller("DetailCtrl",function($scope,Product,Select,ShopCart){
	$scope.product=Product.all();
	//console.log(Select[0])
	
	$scope.item=Select[0];
	
	$scope.add=function(){
		ShopCart.add(arguments[0]);
		var second=arguments[1];
		console.log(second)
	}
	
	//衣服的颜色和尺寸默认值:
	$scope.data={
		color:"Green",
		size:"Size M"
	}
	
})
