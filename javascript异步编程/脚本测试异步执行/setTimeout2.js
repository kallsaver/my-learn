var time2=four.getTime()
console.log(time2)
setTimeout(function(){
	console.log(new Date().getTime()-time1)
},0)

setTimeout(function(){
	console.log(new Date().getTime()-time1)
},5000) 
console.log("aa")

$.ajax("../data/activity.json",function(data){
			console.log(2,data)
		})