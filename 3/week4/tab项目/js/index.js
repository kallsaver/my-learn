/**
 * Created by hxsd on 2016/10/27.
 */
    var myapp=angular.module("myapp",["ionic"])

    myapp.config(function($stateProvider,$urlRouterProvider){
        $stateProvider.state("tabs",{
            url:"/tabs",
            templateUrl:"views/tabs/tabs.html"
        })
    })


    myapp.controller("myCtrl",function($scope){
        
    })