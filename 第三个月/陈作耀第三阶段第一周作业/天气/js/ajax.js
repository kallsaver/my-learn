/**
 * Created by hxsd on 2016/10/6.
 */
var $ = {
    //获得后台和服务器的核心对象XMLHttpRequest 并在它的open方法配置参数获得数据的文本内容
    ajax: function (url, successfn, errorfn) {
        //XMLHttpRequest是对后台数据请求的对象
        var xhr = new XMLHttpRequest();

        //XMLHttpRequest的open方法有三个参数 (get/post),资源的路径,异步(true)还是同步(false)
        xhr.open("get", url, true);

        //readyState的值在0~4之间变化的事件
        xhr.onreadystatechange = function () {
            //readyState
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    //获得回调函数的实参
                    successfn && successfn(xhr.responseText);// responseText 服务器响应的文本内容
                }
                if (xhr.status == 404) {
                    errorfn && errorfn(xhr.status)
                }
            }

        }
        //ajax请求第三部
        xhr.send(null);
    },
    //
    getJSON: function (url, successfn, errorfn) {
        //XMLHttpRequest是对后台数据请求的对象
        var xhr = new XMLHttpRequest();

        //XMLHttpRequest的open方法有三个参数 (get/post),资源的路径,异步(true)还是同步(false)
        xhr.open("get", url, true);

        //readyState的值在0~4之间变化的事件
        xhr.onreadystatechange = function () {
            //readyState
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    //获得回调函数的实参
                    successfn && successfn(JSON.parse(xhr.responseText));// responseText 服务器响应的文本内容
                }
                if (xhr.status == 404) {
                    errorfn && errorfn(xhr.status)
                }
            }

        }
        //ajax请求第三部
        xhr.send(null);
    },

    //百度APIStorm在线获得天气预报
    baiduGetJSON: function (url, success) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    if (success) {
                        //JSON.parse不仅仅是转成js对象的功能  还有转码的功能 把编码转成中文码
                        var data=JSON.parse(xhr.responseText);
                        data=JSON.stringify(data);
                        //alert(data)
                        //把字符串中的级删除
                        var pattern0=/级/g;
                        /*var pattern1=/星期一/g
                        var pattern2=/星期二/g
                        var pattern3=/星期三/g
                        var pattern4=/星期四/g
                        var pattern5=/星期五/g
                        var pattern6=/星期六/g
                        var pattern7=/星期天/g*/

                        data=data.replace(pattern0,"")
                        /*data=data.replace(pattern1,"Monday")
                        data=data.replace(pattern2,"Tuesday")
                        data=data.replace(pattern3,"Wednesday")
                        data=data.replace(pattern4,"Thursday")
                        data=data.replace(pattern5,"Friday")
                        data=data.replace(pattern6,"Saturday")
                        data=data.replace(pattern7,"Sunday")*/
                        success(JSON.parse(data));
                    }
                }
            }
        };
        // 访问百度API，需要提供一个注册的apikey到请求头部
        xhr.setRequestHeader("apikey", "b3c24a7f8c927615981d117053be0eb2");

        xhr.send(null);
    }

};

var weather = {
    parseIcon: function (weatherName) {
        //
        var icons = {
            晴: "1_07.png",
            阴: "1_30.png",
            多云:"1_03.png",
            小雨: "1_22.png",
            阵雨: "1_22.png",
            中雨: "1_11.png",
            大雨: "1_24.png",
            小雪: "1_36.png",
            中雪: "1_09.png",
            大雪: "1_23.png",
            没有数据:"a_nothing.gif",

        }

        return icons[weatherName] || "a_nothing.gif";
    }

}

