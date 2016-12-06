/**
 * Created by hxsd on 2016/10/26.
 */


/*
angular.module("myapp").controller("reservationCtrl",function($scope){
        //数据从后端请求过来 这里模拟获得数据
       /!* $scope.reservation={
            room:"1302",
            wifi:"5549fgadhg",
            price:"200",
            total:"1400"
        }*!/
    $scope.reservation = "hxsd"
    });*/



angular.module("myapp").controller("reservationCtrl",function($scope){
    // 在实际应用中，预订信息从后端请求过来的
    // 这里模拟数据
    $scope.reservation = {
        room:"1309",
        checkin:new Date(),
        //Date.now()获得1970到至今的毫秒数
        checkout:new Date(Date.now() + 7*24*60*60*1000), // 预定一星期
        wifi:"5201314xh",
        price:168.00
    };
});