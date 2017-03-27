/**
 * Created by hxsd on 2016/10/27.
 */
// 依赖注入DataFacoty这个全局的单例对象
angular.module("myApp").controller("productsCtrl",function($scope, DataFactory,$state){
    // 调用单例对象的.query()方法，拿到存储的全局的商品数据
    $scope.data = DataFactory.quer();
    //console.log(Object.prototype.toString($scope.data.productList).slice(8,-1))
     $scope.come=function(){
     	 console.log(a)
     	 console.log(a[0]["title"])
    }
    $scope.a=a;
    var content=document.getElementsByTagName()("ion-content");
   	console.log(content)
   
   
    
    
     
});