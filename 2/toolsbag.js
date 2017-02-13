// JavaScript Document
//封装一个函数（工具包） 不把对象封进去 函数参数是一个变量 这个变量的数据类型通常就是object  把封对象进去就不叫工具包了  把对象封进去 参数就要写成字符串了
	function drag(obj,title){
		var title=title || obj;
		
		title.onmousedown=function(ev){
		//记录偏移量  不然鼠标会始终在方块的左上角;
		var oEv=ev||window.event;
		var disX=oEv.clientX-obj.offsetLeft;
		var disY=oEv.clientY-obj.offsetTop;
		var w=obj.offsetWidth;
		var h=obj.offsetHeight;
		var screenW=document.documentElement.clientWidth;
		var screenH=document.documentElement.clientHeight;
		
			
				//	
			document.onmousemove=function(ev){
					var oEv=ev||window.event;
					//oEv.clientX是指鼠标的x轴坐标,是number类型的变量;
					var l=oEv.clientX;
					var t=oEv.clientY;
					
					
					//行内样式有width和height,js才可以获得样式的数据,数据类型为string,js无法获取行外样式,但是js可以用offsetWidth获得div的宽度,但是offsetWidth的数据类型是number,是系统算出来的;
					//var w=parseInt(box.style.width);	
					//var h=parseInt(box.style.height);
					obj.style.left=l-disX+"px";
					obj.style.top=t-disY+"px";
					
					//这里的if要写在后面判断,是因为后面的会把前面的冲点,如果if写在前面,等于没写
					
					//这里的if不用嵌套判断,嵌套判断会卡,因为每执行一次,都要执行if里面的内容一次
					
					//而这里的结构,只有满足if的条件,才会执行if里面的内容,所以动画效果流畅
					
					if(l-disX<0){
						obj.style.left=0+"px";
						
					}
					
					
					if(l-disX+w>screenW){
						obj.style.left=screenW-w+"px";
					}
					
					if(t-disY<0){
						box.style.top=0+"px";
					}
					
					if(t-disY+h>screenH){
						box.style.top=screenH-h+"px";
					}
					
					
			}
			//这里用document    以下代码放外面一层也可以实现
			document.onmouseup=function(){
				document.onmousemove=null;
			}
		
		return false;
		
	}
		
		}
	
		//标题点击触发事件