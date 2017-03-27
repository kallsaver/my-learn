/**
 * Created by hxsd on 2016/10/26.
 */

    //注入ionic模块
    var myapp=angular.module("myapp",["ionic"])

    //在主js文件中绑定子页面的模板和控制器在一个状态机中   这样方便管理和调用  在子页面中不用再写ng-controller=""
    myapp.config(function($stateProvider,$urlRouterProvider){
        $stateProvider.state("tour",{url:"/tour",templateUrl:"views/tour/tour.html",controller:"tourCtrl"})
            .state("home",{url:"/home",templateUrl:"views/home/home.html"})
            .state("reservation",{url:"/reservation",templateUrl:"views/reservation/reservation.html",controller:"reservationCtrl"})
            .state("restaurant",{url:"/restaurant",templateUrl:"views/restaurant/restaurant.html",controller:"restaurantCtrl"})
            .state("weather",{url:"/weather",templateUrl:"views/weather/weather.html",controller:"weatherCtrl"})

        //默认路由
        //$urlRouterProvider.otherwise("/home")
        $urlRouterProvider.otherwise("/tour")
    })

    //主控制器
     myapp.controller("myCtrl",function($scope){
    
     })

