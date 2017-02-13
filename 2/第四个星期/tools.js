// JavaScript Document

//对象名------------------------------------------
var tools={

	"getstyle":function(obj,styleName,fn){
												//IE                   //W3c        false填的是伪类
	//w3c和IE8以上的设置透明度样式的方法是opacity:0~1; IE8以下的设置透明度样式的方法是filter:alpha(opacity:0~100);
	//w3c和IE8以上的查询样式的方法是getComutedStyle  ;IE8以下的查询样式的方法是currentStyle
		var value=obj.currentStyle ? obj.currentStyle[styleName]:getComputedStyle(obj,false)[styleName];
		
		return styleName=='opacity' ? value=Math.round(parseFloat(value)*100):value=parseInt(value);
	},
	
	//这里的timer要写在函数的外面 如果写在里面的话 点击btn 会有很多个兄弟函数run在运行 而他们的timer不是同一个东西 不能互相影响
	//而每个timer都影响到同一个对象obj.style.left(所有的系统变量都是全局变量)的值,所以会加快
	
	//属性名key 和一个带4个参数的匿名函数---------------------------------------------------------
	 "run": function(obj,time,stylejson,fn){
	    //预定义-------------------------------------------------------------------------------
		//这个删除定时器的作用是防止连续执行函数 定时器叠加会越来越快
		clearInterval(obj.timer);
		var n=0;
		//var start=getstyle(obj,styleName);
			//路程
		//var distance=end-start;
			//总步数
		var count=parseInt(time/30);
		
		var start={};   //   最终得出例如start={"width":50,"height":50}
		
		var distance={};
		
		//从stylejson中拿数据
		for(var key in stylejson){
			//stylejson循环了多少遍 拿了什么属性 start就循环多少遍 并且拿先相同的属性   这里的this指的是btn 谁调用getstyle就是谁  
			start[key]=this.getstyle(obj,key);
			//json的减法 按照stylejson的key排序  相同的key的属性值相减
			distance[key]=stylejson[key]-start[key];	
		
		}
		
		console.log(distance,start)
		//主体部分是用定时器-------------------------------------------------------------------------
		//这里用了点语法变量  很好“保护了”环境  所以的系统变量都是全局变量  定时器的返回值是一个id 所以才会有删除定时器的效果
		obj.timer=setInterval(function(){
			//n是和count比较用的
			n++;
			
			for(var key in stylejson){
				//输出的距离
				var step_dis=distance[key]/count*n;
				
				//减速效果
				var a=1-n/count;
	
				
				//如果是ie
				if(key=="opacity"){
					//
					obj.style.filter='alpha(opacity:'+step_dis+')';
					obj.style.opacity=start[key]+distance[key]*(1-a*a*a*a);
				}
				
				
				//用jason的方法 
				else {obj.style[key]=start[key]+distance[key]*(1-a*a*a*a)+"px";}
				
				if(n==count){
					clearInterval(obj.timer);
					fn&&fn();
				}
				
					//这个删除定时器的作用是当box运动到尽头 定时器就不再跑了
		
			}
			
				
		},30)
	}
	
}

