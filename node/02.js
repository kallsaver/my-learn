var fs = require('fs');
var frames = [];
for(var j = 1 ;j < 7;j++){
	//path,options
	frames[frames.length] = fs.readFileSync(`./frames/${j}.txt`,'utf8');
}



var index = 0;
var render = ()=>{
	if(index === frames.length){
		index = 0;
	}
	//将当期控制台清空
	process.stdout.write('\033[2J');
	process.stdout.write('\033[0f');
	
	//输出新的内容
	process.stdout.write(frames[index++]);
}

setInterval(render,400);
