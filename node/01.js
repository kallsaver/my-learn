//node命令前两个参数没有什么意义,一个是node.exe,一个是所在的目录,所以通常把它们切掉
//var argv = process.argv.slice(2);
//console.log(argv);
//
//switch(argv[0]){
//	case 'init' : console.log('you need init');break;
//	case 'install' : console.log('you need install');break;
//}

//标准输出
//process.stdout.write('hello\n');

//模板字符串
//var log = (message) => {
//	process.stdout.write(`${message}\n`);
//}
//
//log('aaa');


var frames = [];

frames[frames.length] = `

		
			1
		

`;
frames[frames.length] = `

		
			2
		

`;
frames[frames.length] = `

		
			3
		

`;
frames[frames.length] = `

		
			4
		

`;

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
