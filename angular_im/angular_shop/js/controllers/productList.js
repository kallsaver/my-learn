//控制器是负责处理数据的      controller是个构造函数
myapp.controller("productListCtrl",function($scope,shopCart){
	//数据先从次级控制器中找  再从顶级控制器中找
	/*$scope.dat={
		categroies:[
            {id:"10001",category:"商品类别1"},
            {id:"10002",category:"商品类别2"},
            {id:"10003",category:"商品类别3"},
            {id:"10004",category:"商品类别4"}
        ]
	}*/
	console.log(111)
	
	// 定义两个与分页计算有关的变量：
    $scope.pageNum = 1; // 当前页码，默认第一页
    $scope.pageSize = 3;// 页面大小，默认每页显示3个商品信息
    
    //声明数据类型是个好习惯
    $scope.selectedCategory=null;
    
    
    //点击函数
    $scope.selectCategory=function(category){
    	$scope.selectedCategory=category;        //存储html传过来的参数
    	$scope.pageNum = 1; // 重置分页按钮   //scope是个构造函数
    	console.log(this);           //$scope 相当于Array.prototype , jQuery.fn
    	//alert(this.constructor.name)  //事实上scope是非原生最底层原型   	
    }
   
    
    //过滤函数      是原形filter的参数     类似数组的filter方法的回调函数  它的参数名随便   它负责对每个元素进行判断
    $scope.filterByCategory=function(product){
    	//点击首页的情况
    	if($scope.selectedCategory==null){
    		return true;
    	}
    	else{//说明已经点击了
    		if($scope.selectedCategory==product.category){
    			return true;
    		}
    		else{
    			return false;
    		}
    	}	
    }
  
    //高亮选中的商品类别    
    $scope.getActiveClass=function(category){
    	console.log("getActiveClass")   //16次
    	//DOM元素原型中的变量和DOM元素的变量比较
    	return $scope.selectedCategory==category?"btn-primary":"";
    };
    
    //请求分页
    $scope.selectPage=function(newPage){
    	console.log("selectPage");
    	$scope.pageNum=newPage;
    }
    
    //高亮选中的分页
    $scope.getActivePage=function(newPage){
    	console.log("getActivePage")  //16次
    	return $scope.pageNum==newPage?"btn-primary":"";
    }
    
    //添加商品到购物车
	$scope.add=function(product){
		shopCart.add(product)
	}
    
})