

angular.module("starter.services")
.factory('Product', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var products = [
    {
      id: 1,
      name: "Zara shirt",
      price: 30,
      sale_price: 20,
      thumb: "img/list/p_1.jpg",
      images: [
        "img/detail/d_1.jpg",
        "img/detail/d_2.jpg",
        "img/detail/d_3.jpg"
      ],
      description: "Due to Christmas Time, the returns/exchanges period for orders placed between the 27th of November and the 17th of December will be extended until the 17th of January.",
      reviews: 
        {
          avatar: "img/avatar.jpg",
          name: "Slimer",
          content: "This product is very good",
          stars: 5,
          colorList:["green,blue,red"],
          sizeList:["size s,size m,size l"]
        }
      
    },
    {
      id: 2,
      name: "Mango shirt",
      price: 30,
      sale_price: null,
      thumb: "img/list/p_2.jpg",
      images: [
        "img/detail/d_1.jpg",
        "img/detail/d_2.jpg",
        "img/detail/d_3.jpg"
      ],
      description: "Due to Christmas Time, the returns/exchanges period for orders placed between the 27th of November and the 17th of December will be extended until the 17th of January.",
      reviews: 
        {
          avatar: "img/avatar.jpg",
          name: "Slimer",
          content: "This product is good",
          stars: 4
        }
    },
    {
      id: 3,
      name: "Zara shirt",
      price: 30,
      sale_price: null,
      thumb: "img/list/p_3.jpg",
      images: [
        "img/detail/d_1.jpg",
        "img/detail/d_2.jpg",
        "img/detail/d_3.jpg"
      ],
      description: "Due to Christmas Time, the returns/exchanges period for orders placed between the 27th of November and the 17th of December will be extended until the 17th of January.",
      reviews: 
        {
          avatar: "img/avatar.jpg",
          name: "Slimer",
          content: "This product is soso",
          stars: 3
        }
    },
    {
      id: 4,
      name: "Mango shirt",
      price: 30,
      sale_price: 20,
      thumb: "img/list/p_4.jpg",
      images: [
        "img/detail/d_1.jpg",
        "img/detail/d_2.jpg",
        "img/detail/d_3.jpg"
      ],
      description: "Due to Christmas Time, the returns/exchanges period for orders placed between the 27th of November and the 17th of December will be extended until the 17th of January.",
      reviews: 
        {
          avatar: "img/avatar.jpg",
          name: "Slimer",
          content: "This product is very good",
          stars: 5
        }
    },
    {
      id: 5,
      name: "Zara shirt",
      price: 30,
      sale_price: 20,
      thumb: "img/list/p_5.jpg",
      images: [
        "img/detail/d_1.jpg",
        "img/detail/d_2.jpg",
        "img/detail/d_3.jpg"
      ],
      description: "Due to Christmas Time, the returns/exchanges period for orders placed between the 27th of November and the 17th of December will be extended until the 17th of January.",
      reviews: 
        {
          avatar: "img/avatar.jpg",
          name: "Slimer",
          content: "This product is good",
          stars: 4
        }
    },
    {
      id: 6,
      name: "Zara shirt",
      price: 30,
      sale_price: null,
      thumb: "img/list/p_6.jpg",
      images: [
        "img/detail/d_1.jpg",
        "img/detail/d_2.jpg",
        "img/detail/d_3.jpg"
      ],
      description: "Due to Christmas Time, the returns/exchanges period for orders placed between the 27th of November and the 17th of December will be extended until the 17th of January.",
      reviews: 
        {
          avatar: "img/avatar.jpg",
          name: "Slimer",
          content: "This product is very good",
          stars: 5
        }
    },
  ];

  return {
    all: function() {
      return products;
    },
    get: function(productId) {
      for (var i = 0; i < products.length; i++) {
        if (products[i].id === parseInt(productId)) {
          return products[i];
        }
      }
      return null;
    }
  };
})

.factory("Select",function(){
	var select=[];
	
	return select;
})

.factory("ShopCart",function(){
	//在次模板factory中var的变量  并且return出去了   那么它的生命周期是window  不断累积数据
	//但是它又不是全局变量  注入全局变量可以访问它的地址   //全局变量和生命周期有点微妙的联系但不是同一个东西
	var cart=[];
	//
	return{
		
		add:function(product){		//核心方法
			//先判断购物车是否有该商品  cart.length=0不会进行for循环
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
