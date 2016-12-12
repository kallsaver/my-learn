 // 新创建一个模块，在这个新模块中定义通用的分页过滤器
 
// 新创建一个模块，并注册一个分页过滤器
angular.module("marsFilter",[])
	//自定义过滤器              传入字符串到构造函数filter   生成一个新的实例pagerFilter函数
	.filter("pagerFilter",function(){
		/*productList：要被过滤的商品集合 - 数组
        pageNum: 要显示的页码 - 整数
        pageSize：页面大小-每页显示的商品数量 - 整数
        Angular中提供了一些工具方法，用来判断数据的类型*/
       //注意angular的数据流向:scope给值  
		return function(productList,pageNum,pageSize){
			if(angular.isArray(productList)&&angular.isNumber(pageNum)&&angular.isNumber(pageSize)){
				//pageNum从1开始 
				//计算起始索引值  (n-1)*pageSize
				var startIndex=(pageNum-1)*pageSize;
				
				//
				if(startIndex>productList.length){
					return [];
				}
				else{
					return productList.slice(startIndex,startIndex+pageSize)		// [startIndex,endIndex)
				}
				
			}
			else{
				//pageNum,pageSize不是number的时候    这个可以优化下
				return productList;
			}
			
		}
	})
	//这个过滤器不是不具备数组filter方法    没有迭代的功能   它是angular的过滤器 
	.filter("pageCountFilter",function(){
		return function(productList, pageSize){
			if(angular.isArray(productList)&&angular.isNumber(pageSize)){
				//计算最大的页数
				var total=Math.ceil(productList.length/pageSize);
				//生成1,2,3,最大页数的数组返回出去
				var arr=[];
				for(var i=0;i<total;i++){
					arr.push(i+1);
				}
				return arr;
			}
			else{
				return productList;
			}
		}
	})
