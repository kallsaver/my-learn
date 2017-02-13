/**
 * Created by hxsd on 2016/10/20.
 */

    var app=angular.module("app",["mypage","ngRoute"])

    app.config(function($routeProvider){
        $routeProvider.when("/",{
            templateUrl:"view/product_list.html",
            controller:"productCtrl"
        })

        $routeProvider.otherwise()
    })

    app.controller("myCtrl",function($scope){

            $scope.data={
                //商品类别
                categories:[
                    {id:"1001",category:"商品类别01"},
                    {id:"1002",category:"商品类别02"},
                    {id:"1003",category:"商品类别03"},
                    {id:"1004",category:"商品类别04"}
                ],
                //商品明细
                products:[
                    {name:"火星商品01",category:"商品类别01",price:100,desc:"2018流行新款",imgsrc:"images/TB1_50x50.jpg"},
                    {name:"火星商品02",category:"商品类别01",price:120,desc:"2018流行新款",imgsrc:"images/TB2_50x50.jpg"},
                    {name:"火星商品03",category:"商品类别01",price:80,desc:"2018流行新款",imgsrc:"images/TB3_50x50.jpg"},
                    {name:"火星商品04",category:"商品类别01",price:85,desc:"2018流行新款",imgsrc:"images/TB4_50x50.jpg"},
                    {name:"火星商品05",category:"商品类别02",price:820,desc:"2018流行新款",imgsrc:"images/TB1_50x50.jpg"},
                    {name:"火星商品06",category:"商品类别02",price:180,desc:"2018流行新款",imgsrc:"images/TB2_50x50.jpg"},
                    {name:"火星商品07",category:"商品类别02",price:650,desc:"2018流行新款",imgsrc:"images/TB3_50x50.jpg"},
                    {name:"火星商品08",category:"商品类别02",price:350,desc:"2018流行新款",imgsrc:"images/TB4_50x50.jpg"},
                    {name:"火星商品09",category:"商品类别03",price:300,desc:"2018流行新款",imgsrc:"images/TB1_50x50.jpg"},
                    {name:"火星商品10",category:"商品类别03",price:310,desc:"2018流行新款",imgsrc:"images/TB2_50x50.jpg"},
                    {name:"火星商品11",category:"商品类别04",price:270,desc:"2018流行新款",imgsrc:"images/TB3_50x50.jpg"},
                ]
            }

    })

    app.controller("productCtrl",function($scope){
        //html可以读到控制器中的全局变量
        $scope.selects=null;
        $scope.page=1;
        $scope.number=3;

        //记录类别的函数   i是传入的字符串
        $scope.selectCategory=function(i){
            $scope.page=1;
            $scope.selects=i;
            //alert(i)
        }

        $scope.go=function(n){
            $scope.page=n;
        }

        //过滤函数
        $scope.cateoryFilter=function(product){
            /*if($scope.selects==null){

                return true;
            }

            else if($scope.selects==product.category){
                    return true;
            }
            else {
                    return false
            }*/

            //赋值运算符的优先级比&&高哦  而&&运算符的优先级比||高哦
           /* return $scope.selects == null || product.category == $scope.selects;*/

            return    !$scope.selects||    $scope.selects==product.category
        }



    })