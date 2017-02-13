// JavaScript Document

var hxsd_widget={
	
	slide:function(id,showNum){
		var oDiv=document.getElementById(id);
		var oUl=oDiv.getElementsByTagName('ul')[0];
		var aLi=oUl.children;
		
		var pBtn=oDiv.children[0];
		var nBtn=oDiv.children[1];
		var n=0;
		
		
		//公共方法
		function changeBtn(n){
			for(var k=0; k<aBtn.length; k++){
				aBtn[k].className='';
			};
			aBtn[n].className='ac';
			hxsd_tools.move(oUl,{"left":-li_w*n});
		};
		
		
		//------------------------------------------------
		var li_w=hxsd_tools.getStyle(aLi[0],'width');//得到一个li的宽度
		oUl.style.width=li_w*aLi.length+'px';//设定ul宽度
		
		
		//插入按钮---------------------------------------------
		var ol=document.createElement('ol');
		for( var i=0; i<aLi.length; i++ ){
			ol.innerHTML+='<li>'+(showNum? i+1 : '')+'</li>';
		};
		oDiv.appendChild(ol);
		
		var aBtn=oDiv.getElementsByTagName('ol')[0].children;
		
		aBtn[0].className='ac';
		
		//按钮绑定事件------------------------------------------
		for(var i=0; i<aBtn.length; i++){
			
			aBtn[i].index=i;//发牌照
			aBtn[i].onclick=function (){
				//移动图片
				n=this.index;
				changeBtn(n);
			}
		}
		//左右切换-----------------------------------------------
		pBtn.onclick=function(){//前一个
			n--;
			if(n<0){
				n=0;
			};
			changeBtn(n);
		};
		
		nBtn.onclick=function(){//前一个
			n++;
			if(n>=aLi.length-1){
				n=aLi.length-1;
			};
			changeBtn(n);
			
		};
		
	
	
	},
	
	//选项卡
	tab:function(){
	
	
	},



}


