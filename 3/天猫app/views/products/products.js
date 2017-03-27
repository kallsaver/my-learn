/**
 * Created by hxsd on 2016/10/27.
 */
    myapp.controller("productsCtrl",function($scope,DataFactory){
        //调用单例对象的.query()方法,拿到储存的全局商品数据
        //这里query()多此一举
        $scope.data=DataFactory.query()
		console.log($scope.data)		//Object{} 空对象
        //console.log(Object.prototype.toString($scope.data.productList).slice(8,-1))//Object 而我们希望得到的是数组
    	//console.log(Object.prototype.toString.call($scope.data.productList).slice(8,-1)) //Array
    })