//字面量的内部函数调用  为了避免出错不用this 直接mathtools.
var mathtools={
	
	//1.判断数据类型	区别数组和对象  返回值是字符串
	printType:function(o){
		 if (o===null){
            return "null";
        }
        if(o===undefined){
            return "undefined";
        }
        return Object.prototype.toString.call(o).slice(8,-1)		
	},
	
	//2.深度克隆
	deepClone:function(obj){
        var result;				//每一维度有一个rensult
		//对第一次传obj做判断
        if(mathtools.printType(obj)==="Array"){
            result=[];
        }
        else if(mathtools.printType(obj)==="Object"){
            result={};
        } 
		else{return obj}

        for(var key in obj){
            //如果obj[key]是个数组或者对象  不递归只能拿到指针  无法拿到具体的堆地址的值
            //判断obj[key]的类型  如果是,递归拿值(值储存在堆地址中)
            var copy=obj[key];
            var oClass=mathtools.printType(copy);		//这里因为递归了 所以不能用this.isType
            if(oClass==="Object"){
               result[key]=arguments.callee(copy);  //拿到的是deepClone函数的指针
            }
            else if(oClass==="Array"){
                result[key]=arguments.callee(copy);
            }
            //如果obj[key]不是对象或者数组  直接拿值
            else{result[key]=copy;}
        }

        return result;
   },	
	
	// 3.ajax请求		实参xhr.responseText的是String数据类型  形参要注意用JSON.parse方法转成字面量对象 
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
	
}
