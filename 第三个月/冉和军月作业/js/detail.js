// JavaScript Document
documentReady(function(){
	var smallPic = document.getElementById('smallPic');
	var bigPic = document.getElementById('bigPic');
	var move = document.getElementById('move');
	var oUl = document.getElementById('ul_list');
	var aLi = oUl.getElementsByTagName('li');
	var leftBtn = document.getElementById('leftBtn');
	var rightBtn = document.getElementById('rightBtn');
	var num = document.getElementById('num');
	var opt = document.getElementById('opt');
	var n =0;
	//绑定左右切换的两个按钮
	myTools.addEvent(rightBtn,'click',function(){
		n++;
		if(n>=2){n=2}		
		myTools.move(oUl,{'left':-n*63},'fast');
		
	});
	myTools.addEvent(leftBtn,'click',function(){
		n--;
		if(n<=0){n=0;};		
		myTools.move(oUl,{'left':-n*63},'fast');		
	});
	//移动到每个小图上加边框  和 上面对应切换大图
	for(var i=0;i<aLi.length;i++){
		aLi[i].index = i;
		myTools.addEvent(aLi[i],'mouseenter',function(){
			for(var i=0;i<aLi.length;i++){
				aLi[i].className = '';	
			}
			myTools.addClass(this,'first');
			smallPic.children[0].children[0].setAttribute('src','images/lismall_0'+(this.index+1)+'.jpg');
			bigPic.children[0].setAttribute('src','images/lisbig_0'+(this.index+1)+'.jpg');
		})		
	}
	//放大镜----------------------------------------------------------------
	myTools.addEvent(smallPic,'mousemove',function(e){
		bigPic.style.display =move.style.display ='block';
		e = e || event;
		//小黄匡的移动 和范围--
		var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
		var l = e.clientX-move.offsetHeight/2-myTools.offsetLeft(smallPic);
		var t = e.clientY+scrollTop-move.offsetWidth/2-myTools.offsetTop(smallPic);

		if(l<0){l=0}
		if(l>(smallPic.offsetWidth-move.offsetWidth)){
			l=smallPic.offsetWidth-move.offsetWidth;
		}
		if(t<0){t=0}
		if(t>smallPic.offsetHeight-move.offsetHeight){
			t=smallPic.offsetHeight-move.offsetHeight;
		}
		move.style.top = t+'px';
		move.style.left = l+'px';
		//外边大图的对应移动效果----------
		var rateX = l/(smallPic.offsetWidth-move.offsetWidth);
		var rateY = t/(smallPic.offsetHeight-move.offsetHeight);
		bigPic.children[0].style.left = -rateX*(bigPic.children[0].offsetWidth-bigPic.offsetWidth)+'px';
		bigPic.children[0].style.top = -rateY*(bigPic.children[0].offsetHeight-bigPic.offsetHeight)+'px';
	});
	//鼠标移出隐藏-------
	myTools.addEvent(smallPic,'mouseleave',function(e){
		bigPic.style.display =move.style.display ='none';
	})
	//购物车增加减少
	myTools.addEvent(opt.getElementsByTagName('a')[0],'click',function(){
		num.innerHTML = parseInt(num.innerHTML)+1		
	})	
	myTools.addEvent(opt.getElementsByTagName('a')[1],'click',function(){
		if(parseInt(num.innerHTML)>1){num.innerHTML = parseInt(num.innerHTML)-1}
	})
	//选项卡
	var title = document.getElementById('title');
	var aLi1 = title.getElementsByTagName('li');
	var none = document.getElementById('none');
	var i =0;
	for(var i=0;i<aLi1.length;i++){
		aLi1[i].index = i;
		myTools.addEvent(aLi1[i],'click',function(){
			for(var j=0;j<aLi1.length;j++){
				myTools.removeClass(aLi1[j],'ac');
				none.children[j].className = '';
			}
			i = this.index;
			myTools.addClass(this,'ac')	;
			none.children[i].className = 'none';
		})	
	}
	//点击切换
	color_choice('color_choice','color_choice');
	color_choice('baitiao','baitiao');
	//移动上去 显示全部商品
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
})