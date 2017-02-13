// JavaScript Document

//读取样式
function getStyle(obj, styleName){
	var value=obj.currentStyle ? obj.currentStyle[styleName]:getComputedStyle(obj, false)[styleName];
	return styleName=='opacity' ? value=Math.round(parseFloat(value)*100):value=parseInt(value);
};


/*//读取样式
function getStyle(obj, styleName){
	var value=obj.currentStyle ? obj.currentStyle[styleName]:getComputedStyle(obj, false)[styleName];
	if(styleName=='opacity') value=Math.round(parseFloat(value)*100);
	isNaN(parseInt(value)) ? value=0 : value=parseInt(value);
	return value;
}*/

//判断运动方式  透明度  上下/左右移动  宽 高  opacity  top left  width  height-----------------------
/*function getMoveValue(obj, moveMode){
	//透明度
	if(name=='opacity'){
		var moveValue=Math.round(parseFloat(getStyle(obj, moveMode))*100);
	}
	else{
		var moveValue=parseInt(getStyle(obj, moveMode));
	};
	
	//top left width height
	if(isNaN(moveValue)){
		switch(moveValue){
			case 'top':
				return obj.offsetTop;
			case 'left':
				return obj.offsetLeft;
			case 'width':
				return obj.offsetWidth;
			case 'height':
				return obj.offsetHeight;
		}
	}
	return moveValue;
}*/

//-----------------------------------------------------------------------------
function move(obj,moveJson,stopTime,callback){//对象 终点 运动终点  运动方式
	var prd_speed={ //预定义 predefine
		veryslow:	5000,
		slow:		2000,
		normal:		1000,
		fast:		700,
		veryfast:	300
	};
	
	//如果输入预定速度的字符串，就进行转换
	if(stopTime){
		if(typeof stopTime=='string'){
			stopTime=prd_speed[stopTime];
		};
	}else{
		stopTime=prd_speed.normal;
	}
	
	//-----------------------------------------------------
	var start={};//json
	var dis={};//json
	
	for(var key in moveJson){
		start[key]=getStyle(obj, key);
		dis[key]=moveJson[key]-start[key];//距离 distance
	}
	
	//分段
	var count=parseInt(stopTime/30);////次数
	var n=0;//步进
	
	//定时器---------------------------------------------
	clearInterval(obj.timer);//使用对象属性，定义计时器变量
	
	obj.timer=setInterval(function(){
		n++;
		
		for(var key in moveJson){
			var a=1-n/count;  //a的值会越来越小
			var step_dis=start[key]+dis[key]*(1-a*a*a);
			
			if(key=='opacity'){//透明
				obj.style.filter='alpha(opacity:'+step_dis+')';
				obj.style.opacity=step_dis/100;
			}
			else{//其他
				obj.style[key]=step_dis+'px';
			}
		};
		
		//取消定时器
		if(n==count){
			clearInterval(obj.timer);
			callback && callback();
		};
	
	},30)
};