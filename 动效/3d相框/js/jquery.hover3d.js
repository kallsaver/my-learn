;(function($){
	$.fn.hover3d=function(options){
		var settings=$.extend({
			selector      : null,
			perspective   : 1000,
			sensitivity   : 20,
			invert        : false,
			shine	      : false,
		},options);
		//alert(this.length)
		//闭包   
		//js或者jq的函数 如果里面的参数可以是回调函数的 并且调用这个函数的是一个数组 那么这个函数一定有迭代数组的功能 
	return this.each(function(){
		//this.each中的this是个jq数组  each里面的this是个单一jq对象
		//alert(this)			
		var $this=$(this)
		var $card=$this.find(settings.selector);

		if(settings.shine){
			$card.append('<div class="shine"></div>')
		}

		var $shine=$(this).find(".shine");

		$this.css({
			perspective:settings.perspective+"px",
			transformStyle:"preserve-3d"
		});

		$card.css({
			perspective:settings.perspective+"px",
			transformStyle:"preserve-3d"
		});

		$shine.css({
			position  : "absolute",
			top       : 0,
			left      : 0,
			bottom    : 0,
			right     : 0,
			"z-index" : 9
		});
		function move(event){
			var w= $this.innerWidth(),
				h= $this.innerHeight(),
				//y轴旋转的参数   越
				ax= settings.invert?(w/2-event.offsetX)/settings.sensitivity:-(w/2-event.offsetX)/settings.sensitivity,
				//x轴旋转的参数   距离x轴越远 这个值的绝对值越大  点击下方负  点击上方正
				ay= settings.invert?-(h/2-event.offsetY)/settings.sensitivity:(h/2-event.offsetY)/settings.sensitivity;
			//event.offsetX 鼠标距离点击元素的距离  这里相当于把原点平移到card的几何中心
				dy=event.offsetY-h/2,
				dx=event.offsetX-w/2,
				theta=Math.atan2(dy,dx),
				//角度用于渐变的角度
				angle=theta*180/ Math.PI +90;
				//console.log(angle)

			$card.css({
				perspective    : settings.perspective+"px",
				transformStyle : "preserve-3d",
				transform      : "rotateY("+ax+"deg) rotateX("+ay+"deg)"
			});
<<<<<<< HEAD
																			//亮度是衬托出来的  对角越暗显得这边越亮 
=======
			//亮度是衬托出来的  对角越暗显得这边越亮 
>>>>>>> b5dcfc604a02ad5743b54b114891c28460b72931
			$shine.css('background', 'linear-gradient(' + angle + 'deg, rgba(255,255,255,' + event.offsetY / h * .7 + ') 0%,rgba(255,255,255,0) 80%)');
		}

		function leave(){
			$card.css({
				perspective    : settings.perspective+"px",
				transformStyle : "preserve-3d",
				transform      : "rotateX(0) rotateY(0)"
			});
		}

		//事件监听的匿名函数只有一个参数 并且这个参数是鼠标/键盘
		$this.on("mousemove",function(event){
			move(event)
			console.log($this)
			return $this;
		})

		$this.on( "mouseleave", function(){
			leave();
			return $this;
		});
	})
	}
})($)