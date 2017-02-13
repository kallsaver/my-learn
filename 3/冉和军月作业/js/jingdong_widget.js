// JavaScript Document
//幻灯片
	function slide(id){
		var banner = document.getElementById(id);
		var oUl = banner.getElementsByTagName('ul')[0]
		var aLi = oUl.getElementsByTagName('li');
		var new_oUl = document.createElement('ul');
		var n=0;
		
		//給图片的ul宽度 使其浮动一排
		oUl.style.width = aLi[0].offsetWidth*aLi.length+'px';
		//创建新的ul 并使居中
		for(var i=0;i<aLi.length;i++){
			var oLi = document.createElement('li');
			if(i == 0){myTools.addClass(oLi,'move')}
			new_oUl.appendChild(oLi);
		}
		myTools.addClass( new_oUl,'ac' );
		banner.appendChild(new_oUl);
		new_oUl.style.marginLeft = -new_oUl.offsetWidth/2+'px';
		//給新创建的li 绑定点击的事件
		function run(n){
			for(var k=0;k<new_li.length;k++){
				myTools.removeClass(new_li[k],'move');	
			}			
			myTools.addClass(new_li[n],'move')
			myTools.move(oUl,{'left':-aLi[0].offsetWidth*n})		
		}
		var new_li = new_oUl.getElementsByTagName('li');
		for(var j=0;j<new_li.length;j++){
			new_li[j].index = j;
			myTools.addEvent(new_li[j],'click',function(){
				n =this.index
				run(n);
			})	
		}
		//自动运行的定时器
		setInterval(function(){
			if(n>aLi.length-1){n=0}
			if(n==0){oUl.style.left = 0+'px';}
			run(n);
			n++;		
		},3000)
	}
	function color_choice(id,className){
		var color_choice = document.getElementById(id);
		var color_choice_li = color_choice.getElementsByTagName('li');
		for(var i=0;i<color_choice_li.length;i++){
			color_choice_li[i].onclick = function(){
				for(var j=0;j<color_choice_li.length;j++){
					color_choice_li[j].children[0].className = '';
				}
				this.children[0].className = className;
			}
		}
	}
	//定位楼层
	function position(className){
		var LocationFloorList=myTools.getByClass(document,className)[0];
		var aLi=LocationFloorList.getElementsByTagName('li');
		var aFloor=myTools.getByClass(document,'Floor');
		var arr=[];
		for(var i=0; i<aFloor.length; i++){
			var json={};
			json.name=i;
			json.offsetTop=aFloor[i].offsetTop;
			arr.push(json);
		};
		window.onscroll=function(){
			//显示楼层编号-------------------------------------------------
			var scrolltop=document.documentElement.scrollTop || document.body.scrollTop;
			if(scrolltop>1000){
				LocationFloorList.style.display='block';
			}else{
				LocationFloorList.style.display='none';
			};
			// 根据楼层滚动位置，定位编号------------------------------------------------
			var last_arr=[];
			for(var j=0; j<arr.length; j++){
				if(arr[j].offsetTop<scrolltop+400){
					last_arr.push(arr[j].name);
				}
			};
			var li_index=last_arr[last_arr.length-1];
	
			for(var l=0; l<aFloor.length; l++){
				aLi[l].className='';
			};
			aLi[li_index].className='ac';
		};
		//点击编号，跳转到相对楼层-----------------------------------------------
		for(var i=0; i<aFloor.length; i++){
			aLi[i].index=i;
			aLi[i].onclick=function(){
				var start=document.documentElement.scrollTop || document.body.scrollTop;
				var end=arr[this.index].offsetTop;
				move(start,end)
			}
			aLi[i].onmouseenter=function(){
	
			}
		};	
		var timer;
		function move(start,end){
			var dis=end-start;
			var count=parseInt(1500/30);
			var n=0;
			clearInterval(timer);
			timer=setInterval(function(){
				n++;
				var a=1-n/count;
				var step_dis=start+dis*(1-a*a*a*a);
				window.scrollTo(0,step_dis);
				if(n==count){
					clearInterval(timer);
				};
			},30)
		};
	}
	//显示菜单
		function show(id){
		var wrap_navlist = document.getElementById(id);
		var aLi = wrap_navlist.children[0].children[0].getElementsByTagName('li');
		var muen = wrap_navlist.children[1].getElementsByClassName('section');
		for(var i=0;i<aLi.length;i++){
			aLi[i].index = i;
			aLi[i].onmouseenter = function(){
				wrap_navlist.children[1].style.display = 'block';
				for(var j=0;j<aLi.length;j++){
					muen[j].className ='section clear';
				}
				muen[this.index].className ='section clear block';
				wrap_navlist.children[1].onmouseenter = function(){
					this.style.display = 'block';
				}			
				wrap_navlist.children[1].onmouseleave = function(){
					this.style.display = 'none';
				}
			}		
			aLi[i].onmouseleave = function(){
				wrap_navlist.children[1].style.display = 'none';
			}
		}
	}