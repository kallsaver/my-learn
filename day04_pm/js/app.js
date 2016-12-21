/**
 * Created by hxsd on 2016/10/27.
 */
// 声明购物车模块
var mycart = angular.module("myCart", []);

// 声明主模块
var myapp = angular.module("myApp", ["ionic", "myCart"]);

// 配置路由
myapp.config(function ($stateProvider, $urlRouterProvider,$ionicConfigProvider) {
    $stateProvider.state("home", {
        url: "/home",
        templateUrl: "views/home/home.html"
    }).state("tabs", {
        url: "/tabs",
        abstract: true,      // 抽象的，也就是不能具体化，不能显示
        templateUrl: "views/tabs/tabs.html",
        controller: "tabsCtrl"
    }).state("tabs.products", {
        url: "/products",
        views:{"tab-products":{templateUrl:"views/products/products.html",controller:"productsCtrl"}}
    }).state("tabs.detail", {
        url: "/detail",  //传参，参数名字叫title
        views: {"tab-detail":{templateUrl: "views/detail/detail.html",controller: "detailCtrl"}}
    }).state("tabs.cart", {
        url: "/cart",
        views: {"tab-cart": {templateUrl: "views/cart/cart.html",controller: "cartCtrl"}}
    });
    $urlRouterProvider.otherwise("/home");// 默认首页
    $ionicConfigProvider.tabs.position("bottom")		//tabs置底  在apk中不写这句代码会冲上来
});

// 创建单例对象 - 哪里需要，哪里注入
// 如果将来在哪个控制器中需要使用这个商品数据，注入这个DataFactory单例对象，
// 然后调用它的.query()方法，就拿到了存储的商品数据
myapp.factory("DataFactory", function ($http) {
    var data = { productList: [] };   // 注意：这里一定要是对象的形式

    // http请求服务器端数据。实际开发中，这里替换为服务器端的url
    $http.get("data.json").success(function (_data) {
        data.productList = _data;   // 将服务器返回的商品数据保存起来
    });

    // 返回单例对象
    return {
        // 该对象提供了一个获取所有数据的方法query
        quer: function () {
            return data;   // 返回数据
        }
    };
});
