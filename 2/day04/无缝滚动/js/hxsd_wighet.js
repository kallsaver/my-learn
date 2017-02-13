// JavaScript Document
function marquee(id,speed){
	/*if(!speed){
		speed=10;
	};*/
	
	speed=speed || 10;
	
	var oDiv=document.getElementById(id);
	//计算ul的宽度
	var oUl=oDiv.getElementsByTagName('ul')[0];
	var aImg=oDiv.getElementsByTagName('img');
	var timer;
	var l=0;
	var w=400*aImg.length;//一套图片的总宽度
	oUl.innerHTML+=oUl.innerHTML;//增加了一套图片
	oUl.style.width=2*w+'px';
	
	//定时器
	function move(){
		timer=setInterval(function(){
			l-=speed;
			if(l<-w){//先判断，后赋值
				l=0;
			};
			oUl.style.left=l+'px';
		},30);
	};
	move();//首次调用
	//鼠标进入div，停止动画--清除定时器
	oDiv.onmouseover=function(){
		clearInterval(timer);
	};
	
	oDiv.onmouseout=function(){
		move()//再次调用
	};
};


