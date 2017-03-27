function run(){
	
	var a = 1;
	var c = 2;
	//返回一个对象
	return {
		kkk : c   //c被检测到被引用了,所以不会被内存销毁
	};
	//函数运行完,在内存中a被销毁了,c没有被销毁
}

var d = run().kkk


//程序员A
var A;
(function(){
	var a = 1;
	var name = "Mike";
	//b是程序员A花了几天完成的一个功能函数
	var b = function(){
		console.log(name);
		return name ;
	}
	//使用一个全局变量的方式闭包  因为a和b被一个全局变量引用了,所以不会被内存销毁
	A = {
		a : a,
		b : b    //把b方法的接口分享出去
	}
})();

//程序员B  想拿到程序A中的数据name
var B;
(function(A){  //形参
	var a = 1;
	var b = "something"
	
	B = {
		dfdf : a,
		dffdf : b,
		k : A.b()
	}
	console.log(B.k);
})(A)  //实参

//程序员C  通过return闭包
var C = (function(){  //形参
	var a = 1;
	var b = "something"
	
	return {
		a : a,
		dfdfdlkf : b
	}
})()  //实参

//A,B,C就是一个个模块的接口