/**
 * Created by hxsd on 2016/10/6.
 */
var Ajax = {
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
};
