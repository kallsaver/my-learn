
console.log(document.querySelectorAll('p'));
//querySelector是查找第一个匹配元素,querySelectorAll是查找所有的匹配元素
document.querySelector('p').innerHTML = '异步队列按顺序执行';

//async.js貌似不行
//async.waterfall([
//	function(fn){
//		$.get('data.json').then(function(respond){
//			console.log(respond)
//		});
//		fn(null,'one','two');
//	},
//	function(arg1,arg2,fn){
//		console.log(arg1)
//		setTimeout(function(){
//			console.log('setTimemout');
//		},1000)
//		fn(null,'three');
//	},
//	function(arg1,fn){
//		console.log(arg1);
//		$.get('data.json').then(function(respond){
//			console.log(respond);
//		})
//	},
//	function(err,result){
//		
//	}
//]);


//也不是这种意思
//var func1 = function(){
//	$.get('data.json').then(function(respond){
//			console.log(respond);
//	})
//}
//
//var func2 = function(){
//	setTimeout(function(){
//		console.log('setTimeout');
//	},1000)
//}
//
//var func3 = function(){
//	$.get('data.json').then(function(respond){
//			console.log(respond);
//	})
//}
//
//var funcList = [func1,func2,func3];
//
//var funcPromise = funcList.map(function(item,i){
//	return new Promise(function(resolve,reject){
//		console.log('func'+(i+1)+'has done...');
//		resolve();
//	})
//});
//
//Promise.all(funcPromise).then(function(){
//	console.log('all finish');
//});


//使用then,回调地狱
$.get('data.json').then(function (data) {
	console.log(data);
	var del = new Promise(function (resolve, reject) {
		setTimeout(function () {
			console.log('setTimeout');
			resolve();
		}, 2000);
	});
	del.then(function () {
		$.get('data.json').then(function (data) {
			console.log(data);
		});
	});
});