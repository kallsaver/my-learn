
//options是个字面量对象
function RainyDay(options,canvas){  //options和canvas是实例化的this的两个属性
	if(this===window){
		return new RainyDay(options,canvas)
	}
	
	//实例化的对象的img属性是那张背景图
	this.img=options.image;
	
	//默认的配置
	var defaults= {
		opacity: 1,
		blur: 10,
		width: this.img.clientWidth,           
		height: this.img.clientHeight,
		position: "absolute",
		top: 0,
		left: 0,
		parentElement: document.getElementsByTagName("body")[0],
	}
	
	//如果在插件选项中没有自定义参数的话,那么该项参数就启用默认配置的参数
	for (var key in defaults){
		if (typeof options[key] === "undefined"){
			options[key] = defaults[key]
		}
	}
	
	//实例化出来的对象的options存储了大部分数据  (参数)
	this.options = options;
	//console.log(this)
	
	this.drops = [];
	
	//创建canvas容器   prepareCanvas等方法在 RainDay.prototype里面 即Object层 ,运行底层的函数
	this.canvas =canvas || this.prepareCanvas();   //  
	this.prepareBackground();
	this.prepareGlass()
}

//凡是原型各个层里面如果某个属性是方法  那么function(){}函数体中的this都是指实例化的最顶层

RainyDay.prototype.prepareCanvas=function(){
	var canvas =document.createElement("canvas");
	canvas.style.position = this.options.position;
	canvas.style.top=this.options.top;
	canvas.style.left=this.options.left;
	canvas.width=this.options.width;
	canvas.height=this.options.height;
	this.options.parentElement.appendChild(canvas);  //body
	
}

RainyDay.prototype.prepareBackground=function(){
	
}

RainyDay.prototype.prepareGlass=function(){
	
}

