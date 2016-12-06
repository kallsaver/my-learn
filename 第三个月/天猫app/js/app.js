/**
 * Created by hxsd on 2016/10/27.
 */
    var myCart=angular.module("myCart",[])

    //主模板
    var myapp=angular.module("myapp",["ionic","myCart"])


    myapp.config(function($stateProvider,$urlRouterProvider){
        $stateProvider.state("home",{
            url:"/home",
            templateUrl:"views/home/home.html"
        })
            .state("tabs",{
                url:"/tabs",
                //abstract:true,   //不能显示
                templateUrl:"views/tabs/tabs.html",
                controller:"tabsCtrl"
            })
            .state("tabs.products",{
                url:"/products",
                views:{"tabs-products":{templateUrl:"views/products/products.html",controller:"productsCtrl"}}
            })
            .state("tabs.detail",{
                url:"/detail",
                views:{"tabs-detail":{templateUrl:"views/detail/detail.html",controller:"detailCtrl"}}
            })
           /* .state("tabs.cart",{
                url:"/cart",
                views:{"tabs-cart":{templateUrl:"views/cart/cart.html",controller:"cartCtrl"}}
            })*/
        $urlRouterProvider.otherwise("/home")
    })


    // 如果将来在哪个控制器中需要使用这个商品数据，注入这个DataFactory函数
    // 然后多此一举调用它的.query()方法，就拿到了存储的商品数据,“DataFactory”被factory改造成一个全局函数
    myapp.factory("DataFactory",function($http){
        var data={};   //这里一定是对象的格式

        //http模拟请求服务端数据  _data是data.json里面的数据 是字面量对象  data.json转成字面量对象后给_data
        $http.get("data.json").success(function(_data){
        	//console.log(_data)
        	data=_data; //data拿到_data的地址,不是直接拿数据的地址     //success函数结束后 _data变量名被销毁   _data载体下的对象数据也销毁  data最终data={}
        	//赋值拿到一个对象的方法是不可取的  对象的的生命周期结束 拿到的是空值
        	console.log(Object.prototype.toString.call(_data).slice(8,-1))   //Array
        	console.log(Object.prototype.toString.call(data).slice(8,-1))	//Array
        	
        })
		//--------------------
        //返回单例对象  这里多此一举   直接return data就可以了  多例对象可以用这个方法
        return{
            //该对象提供了一个获取所有数据的自定义方法query
            query:function(){
                return data;
            }
        }
    })