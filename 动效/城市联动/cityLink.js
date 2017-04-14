;(function(){
	$(document).on('click','.gf-select > span',function(){
		//closest先查找自己,再往上查找父元素,如果找到了第一个匹配的就返回
		$(this).closest('.gf-select').css({'zIndex':100});
		//其它的ul隐藏
		$(".gf-select ul").hide();
		//设置ul的高度如果超过154,出现滚动条
		if($(this).next("ul").children().length>4){
			$(this).next("ul").css({"height":154,"overflowY":"auto"});
		}else{
			$(this).next("ul").css({"height":"auto"});
		}
		//自己的ul显示
		$(this).next("ul").show();
	});
	$(document).on("click",".gf-select > span > i",function(){
		var parent = $(this).closest("span").next("ul");
		parent.hide();
		//阻止冒泡,阻止默认事件
		return false;
	});
})();


;(function(){
})();
