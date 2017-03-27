/**
 * Created by hxsd on 2016/10/6.
 *
 * 将ajax请求封装到这个独立的.js文件中
 *
 * 如果直接在这个文件中定义函数的话，有可能会造成冲突。
 * 考虑一下团队协作开发。比如张三和李四分工合作开发项目，
 * 有可能分别在自己写的.js文件中，命名相同的函数
 *
 * 为了避免这种冲突，我们将功能函数分别封装在不同的对象中
 */
// 命名规则：字母、数字、下划线、美元符号组成，不能以数字开头
var $2 = {
    // 封装ajax请求的函数
    ajax:function(url,success,error){
        // step 1: 创建XMLHttpRequest核心对象
        var xhr = new XMLHttpRequest();

        // step 2: 配置相关的请求参数以及服务器响应回来后的处理函数
        xhr.open("GET",url,true);
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4){
                if(xhr.status == 200){
                    if(success) success(xhr.responseText);
                }else if(xhr.status == 404){
                    // 在调用回调函数之前，先判断是否有这个回调函数传入
                    // 有，就调用；没有，不搭理它，当然也不会显示出错信息
                    if(error) error(xhr.status);
                }
            }
        };
        // step 3: 真正发起ajax请求
        xhr.send(null); // 将配置好的请求发给服务器
    }
};
