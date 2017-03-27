/**
 * Created by hxsd on 2016/8/26.
 *
 * 创建一个新的模块myCart，在该模块中要定义一个单例的服务对象(购物车对象)
 * 并且在该模块中，注册与购物车相关的控制器
 * 
 * .controller
 * .filter
 * .factory
 */  //把shopCart字符串改造成一个自运行返回值是一个带数据方法的对象的全局函数 
// 使用factory方法 自定义一个全局变量shopCart(服务)(这是个工厂方法)
//全局的生命周期是浏览器关闭才结束      这个模块很重要    其实可以全部加在主模板里
angular.module("myCart",[]).factory("shopCart",function(){
	//在次模板factory中var的变量  并且return出去了   那么它的生命周期是window  不断累积数据
	//但是它又不是全局变量  注入全局变量可以访问它的地址   //全局变量和生命周期有点微妙的联系但不是同一个东西
	var cart=[];
	//
	return{
		
		add:function(product){		//核心方法
			//先判断购物车是否有该商品  cart=[]不会进来
			for(var i=0;i<cart.length;i++){
				var item=cart[i];
				if(item.product.name===product.name){
					item.number +=1;
					return;
				}
			}
			//如果执行到这里,说明购物车没有该类商品或者cart=[]的情况
			//这里的number没有放入原始数据中  而且也不是DOM数据  用得很6
			//number存储在cart,生命周期由cart决定   当cart不再引用它对应的匿名对象的时候  它的生命周期就结束了
			cart.push({"product":product,number:1})
			console.log(cart)
		},		
		
		// 查看购物车中所有的商品信息 
        findAll: function () {		//核心方法
                return cart;
         },
		
		//删除商品的方法   在checkout页面用到
		remove:function(name){
			for(var i=0;i<cart.length;i++){
				if(cart[i].product.name==name){
					cart.splice(i,1)     //从数组中删除这个对象
					break;		//跳出for循环
				}
			}
		},
		
		clearAll :function(){
			cart.length=0;      //cart上的匿名对象的生命周期结束
		}
		
	}
	
})
//这里要用到shopCart这个工具包 所以要注入    这个作用域只负责首页顶部区域的数据显示
.controller("cartCtrl",function($scope,shopCart){
		//这个cart不是写在原型上的数据 运行一遍就回收了  
		//当页面有事件发生 控制器中的内容全部重新执行一遍
		//这里很重要  
		var cart=shopCart.findAll();
		
		//计算购物车中所有商品数量的方法:
		$scope.totalNumber=function(){
			var total=0;
			for(var i=0;i<cart.length;i++){
				total+=cart[i].number;
			}
			return total;
		};
		
		$scope.totalMoney=function(){
			var total=0;
			for(var i=0;i<cart.length;i++){
				total+=cart[i].product.price*cart[i].number;
			}
			return total;
		}
		
	
})
