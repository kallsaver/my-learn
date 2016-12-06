/**
 * Created by hxsd on 2016/10/26.
 */

    myapp.controller("weatherCtrl",function($scope,$http,$ionicLoading,$ionicHistory){
        var url="http://wthrcdn.etouch.cn/weather_mini?city=深圳"
       // ionicLoading不带参数 只显示一个加载图标
        $ionicLoading.show()
        
        $http.get(url).success(function(data){
            alert(1)
            //隐藏网络加载信息
            $ionicLoading.hide();
            //将返回的天气数据保存到$scope中
            $scope.weather=data;
        }).error(function(){
            $ionicLoading.show({
                template:"请求天气数据失败",
                duration:3000
            }).then(function(){
                $ionicHistory.goBack()
            })
        })
    })