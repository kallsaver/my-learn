// JavaScript Document

function hxsd_tab(id,autoplay){//tab盒子的id，  autoplay：true false
	
	var oTab=document.getElementById(id);
	var oUl=oTab.getElementsByClassName('tabList')[0];
	var aLi=oUl.getElementsByTagName('li');
	var tabItem=oTab.getElementsByClassName('tabItem');
	
	var n=0;//自动播放 传入的编号
	var timer;//计时器用变量
	
	//选项卡
	for(var i=0;i<aLi.length;i++){
		aLi[i].index=i;
		aLi[i].onclick=function(){
			for(var i=0;i<aLi.length;i++){
				aLi[i].className='';	
				tabItem[i].style.display="none";
			};		
			this.className='ac';
			tabItem[this.index].style.display="block";
			n=this.index;
		};	
	};
	
	
	function change(n){
		for(var i=0;i<aLi.length;i++){
			aLi[i].className='';	
			tabItem[i].style.display="none";
		};	
		//指定的n的
		aLi[n].className='ac';
		tabItem[n].style.display="block";
	}
	
	//间隔定时器
	
	timer=setInterval(function(){
		n++;
		change(n);
	
	
	},1000);
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	

	
}
	
		
	


