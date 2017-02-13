/**
 * Created by hxsd on 2016/10/21.
 */
    var shop = angular.module.("shopCart",[])

    shop.factory("cartService",function(){
        var cart=[];

        return {
            add:function(product){
                // 首先遍历购物车的数组，看以前是否已经添加过该商品
                for(var i=0;i<cart.length;i++){
                    var item = cart[i];
                    // 判断购物车中是否已经有了该商品
                    if(item.product.name == product.name){
                        // 说明购物车中已经有了该商品，将该商品的购买数量+1
                        item.number++;
                        return; // 添加商品过程结束
                    }
                }

                // 如果代码执行到这里，说明购物车中没有要添加的商品
                // 构造一个购买项item，加入到购物筐中
                cart.push({ product:product, number:1 });
            },

            // 从购物车中删除某种商品的方法(按商品的名称来删除)
            // 传入的参数就是要删除的商品的名称
            remove:function(name){
                // 遍历购物筐，找到要删除的商品
                for(var i=0;i<cart.length;i++){
                    var item = cart[i];
                    // 判断购物车中是否已经有了该商品
                    if(item.product.name == name){
                        // 说明找到了要删除的商品，将该商品的从数组中删除
                        cart.splice(i,1);
                        return; // 结束
                    }
                }
            },
            // 获得购物车中所有商品的方法 - 方便查看购物车
            findAll:function(){return cart;},
            // 清空购物车：将数组置为空
            clear:function(){cart.length = 0;}
        }
    })

    shop.controller("cartCtrl",function($scope,cartService){
        var carts=cartService.findAll();

        $scope.buyTotal=function(){
            var total=0;
            angular.forEach(carts,function(item){
                total+=item.number
            });
            return total;
        }

        $scope.buyMoney=function(){
            var total=0;
            angular.forEach(cart,function(){
                total+=item.number*item.product.price
            })
            return total
        }
    })