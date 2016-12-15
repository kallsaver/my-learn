/**
 * Created by hxsd on 2016/8/25.
 *
 * 在主模块中注册一个顶级的控制器。（控制器是可以嵌套的）
 * 在这个顶级控制器中，主要用来获取整个项目都会用到的数据，比如：商品信息，订单信息，等等
 */
// 不带[]的方式，是引用模块；如果带了[]，是定义一个模块。 不在html写controller 默认是顶级控制器
angular.module("sportsStore").controller("sportsStoreCtrl",function($scope,$http,$location){
	$scope.data = {
        // 商品的类别
        categroies:[
            {id:"10001",category:"商品类别01"},
            {id:"10002",category:"商品类别02"},
            {id:"10003",category:"商品类别03"},
            {id:"10004",category:"商品类别04"}
        ],
        // 商品的明细
        products:[
            {name:"火星商品01",category:"商品类别01",price:100,desc:"2016流行新款",imgsrc:"images/TB1_50x50.jpg"},
            {name:"火星商品02",category:"商品类别01",price:120,desc:"2016流行新款",imgsrc:"images/TB2_50x50.jpg"},
            {name:"火星商品0301",category:"商品类别01",price:80,desc:"2016流行新款",imgsrc:"images/TB3_50x50.jpg"},
            {name:"火星商品0302",category:"商品类别01",price:85,desc:"2016流行新款",imgsrc:"images/TB4_50x50.jpg"},
            {name:"火星商品0303",category:"商品类别01",price:820,desc:"2016流行新款",imgsrc:"images/TB1_50x50.jpg"},
            {name:"火星商品04",category:"商品类别02",price:180,desc:"2016流行新款",imgsrc:"images/TB2_50x50.jpg"},
            {name:"火星商品05",category:"商品类别02",price:650,desc:"2016流行新款",imgsrc:"images/TB3_50x50.jpg"},
            {name:"火星商品06",category:"商品类别02",price:350,desc:"2016流行新款",imgsrc:"images/TB4_50x50.jpg"},
            {name:"火星商品07",category:"商品类别03",price:300,desc:"2016流行新款",imgsrc:"images/TB1_50x50.jpg"},
            {name:"火星商品08",category:"商品类别03",price:310,desc:"2016流行新款",imgsrc:"images/TB2_50x50.jpg"},
            {name:"火星商品09",category:"商品类别04",price:270,desc:"2016流行新款",imgsrc:"images/TB3_50x50.jpg"}
        ],
        // 收货人信息
        shipping:{}
    };
    
    $scope.run=function(){
    	alert(this.constructor.name)
    }
	
})
