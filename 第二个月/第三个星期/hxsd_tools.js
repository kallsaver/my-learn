// JavaScript Document

//input提示
function placeholder(objInput,txt){//objInput：input框   txt：提示语
	objInput.value=txt;
	objInput.className='placeholder';
	objInput.onfocus=function(){
		if(this.value==txt){
			objInput.value='';
			objInput.className='';
		}
	};
	objInput.onblur=function(){
		if(this.value==""){
			objInput.value=txt;
			objInput.className='placeholder';
		}
	}
};


//拖拽
function drag(obj,title){//obj:对象  title：标题
	
	title=title || obj;//
	
	title.onmousedown=function(ev){
		//记录偏移量 鼠标坐标--div的offsetLeft
		var oEv=ev || window.event;
		var disX=oEv.clientX-obj.offsetLeft;//distance
		var disY=oEv.clientY-obj.offsetTop;//distance
		
		
		//document开始移动
		document.onmousemove=function(ev){
			var oEv=ev || window.event;
			var l=oEv.clientX-disX;//横坐标
			var t=oEv.clientY-disY;//纵坐标
			
			if(l<0){
				l=0;
			};
			var screenW=document.documentElement.clientWidth;
			var screenH=document.documentElement.clientHeight;
			
			if(l>screenW-obj.offsetWidth){
				l=screenW-obj.offsetWidth
			};
			if(t<0){
				t=0;
			};
			if(t>screenH-obj.offsetHeight){
				t=screenH-obj.offsetHeight
			}
			
			//屏幕宽度document.documentElement.clientWidth;
			
			obj.style.left=l+'px';
			obj.style.top=t+'px';
		};
		
		//document解除移动
		document.onmouseup=function(){
			document.onmousemove=null;
		};
		
		return false;//阻止默认事件
	
	}

	}