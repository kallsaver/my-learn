//在jsDOM对象的原型上添加方法,Element是个构造函数
Element.prototype.bgColor = function(){
	function changeColor(dom){
		//dom的背景色是否和上一个兄弟元素的背景色相同
		if(dom.style.backgroundColor != dom.previousElementSibling.style.backgroundColor){
			return;
		}else{
			//函数申明时是不会执行函数体的内容的,此时colorList虽然是undefined,但是无所谓
			var rd = parseInt(Math.random() * colorList.length);
			dom.style.backgroundColor = colorList[rd];
			//如果不符合,运行到符合条件为止,然后return,递归
			//return arguments.callee(dom);
			return changeColor(dom);
		}
	}
	var colorList =  ["#69D2E7", "#A7DBD8", "#E0E4CC", "#F38630", "#FA6900", "#C02942", "#53777A"];
	var rd = parseInt(Math.random() * colorList.length);
	this.style.backgroundColor = colorList[rd];
	if(this.previousElementSibling) {
		changeColor(this);
	}
}
