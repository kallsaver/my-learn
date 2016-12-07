//绑定到结账页面的控制器

angular.module("sportsStore").controller("checkoutCtrl",function($scope,shopCart){
	//获得购物车中所有的商品   
	//这里不能写成cartDate 因为angular的controller函数运行完对应的页面生成
	//cartDate就已经被回收  永远无法得到
	//item.number * item.product.price能拿到数据  说明这个数据的生命周期是还存在的
	//必须用$scope.cartDate
	$scope.cartData=shopCart.findAll();
	//alert($scope.cartData.length)
	
	//计算商品的总金额
	$scope.totalPayment=function(){
		var total=0;
		for(var i=0;i<$scope.cartData.length;i++){
			total+=$scope.cartData[i].number*$scope.cartData[i].product.price;
		}
		return total;
	};
	
	//删除商品的方法:
	$scope.remove=function(name){
		shopCart.remove(name)
	};
	
	$scope.clearAll=function(){
		shopCart.clearAll()
	}
	
	
})
