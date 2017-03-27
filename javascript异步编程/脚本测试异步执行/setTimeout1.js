var four=new Date()
var time1=four.getTime()
console.log(time1)
setTimeout(function(){
	console.log(new Date().getTime()-time1)
},0)                                       
//可以看出0秒的意思是以同步任务执行完后为基准的,不是以上一个任务结束为基准
//总之，setTimeout(fn,0)的含义是，
//指定某个任务在主线程最早可得的空闲时间执行
//也就是说，尽可能早得执行。它在"任务队列"的尾部添加一个事件，
//因此要等到同步任务和"任务队列"现有的事件都处理完，才会得到执行。
setTimeout(function(){
	console.log(new Date().getTime()-time1)
},5000)  

$.ajax("../data/activity.json",function(data){
			console.log(1,data)
		})