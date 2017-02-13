/**
 * Created by hxsd on 2016/10/20.
 */
    var mypage=angular.module("mypage",[])


    //过滤器返回的是数组  过滤函数返回的是真假
    mypage.filter("pageFilter",function(){
        //三个参数  过滤的数组 页码 展示的商品数
        return function(product,page,number){

            var index=(page-1)*number;
            return product.slice(index,index+number)
        }
    })

    mypage.filter("navFilter",function(){
        return function(product,number){
            console.log(number)
            var b=Math.ceil(product.length/number);
            var arr=[];
            for(var i=0;i<b;i++){
                arr.push(i+1)
            }
            console.log(arr)
            return arr;
        }


    })

