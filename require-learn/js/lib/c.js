define(['jquery'],function($){
	console.log("c.js运行")
	var a = {product : []};
	//$.ajax在require函数中写会好点,这里只是试探了异步任务的顺序
	$.ajax({
		type:"get",
		url:"http://api.douban.com/v2/movie/in_theaters",
		async:true,
		dataType : "jsonp",
		success : function(data){
			console.log(data);
			a.product = data;
		}
	});
	return a ;
});