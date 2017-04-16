;(function(){
	$(document).on('click','.gf-select > span',function(){
		//closest先查找自己,再往上查找父元素,如果找到了第一个匹配的就返回
		// 其它的ul隐藏
		$('.gf-select ul').hide();
		// 设置ul的高度如果超过154,出现滚动条
		// 为了代码更加语义化,next()里面可以写ul
		if($(this).next('ul').children().length>4){
			$(this).next('ul').css({"height":154,"overflowY":"auto"});
		}else{
			$(this).next('ul').css({"height":"auto"});
		}
		//自己的ul显示
		$(this).next('ul').show();
	});
	
	$(document).on('click','.gf-select ul li',function(){
		// 性能优化
		var $this = $(this);
		var parent = $this.closest('ul');
		var select = $this.closet('.gf-select');
		var value = $this.attr('data-value');
		var text = $this.text();
		if( $this.closest('.gf-select').hasClass('noclick') ){
			parent.hide();
			return false;
		}
		// em显示控件的文本是li的文本
		select.find('em').html(text);
		select.find("input[type='hidden']").val(value !== 0 ? value : '');
		
	})
	
})();

function selectCity(options){
	var config = {
		domSelect : ["#province","#city","#area"],
		domInit : ["请选择省份","请选择城市","请选择区县"]
	}
	
	var opts = $.extend(config,options);
	
	var $jsondata = {};
	
	var ajaxConfig = {
		url : "allcity.js",
		dataType : "jsonp",
		jsonpCallback : "callback",
		success : initSelectEvent				
	}
	$.ajax(ajaxConfig);
	
	function initSelectEvent(json){
		console.log(json);
		var item = ['<li>' + opts.domInit[0] + '</li>'];
		var data = json['province'];
		var initProvinVal = $(opts.domSelect[0]).find('input').val();
		var initCityVal = $(opts.domSelect[1]).find('input').val();
		var initAreaVal = $(opts.domSelect[2]).find('input').val();
		
		for(var i = 0; i < data.length; i++){
			item.push('<li data-value="'+data[i]["id"]+'" name="'+data[i]["id"]+'">'+data[i]["name"]+'</li>');
		}
		//console.log(item);
		// 在第一个ul中插入省份和直辖市
		$(opts.domSelect[0]).find('ul').html(item.join("\n"));  //或者join('')
		
		$jsondata = json;
		
		// 如果初始化时input[hidden]以及有默认值了,那么久触发这个默认值的li的点击事件
		if(initProvinVal!=""){
			$(opts.domSelect[0]).find("ul li[data-value='"+initProvinVal+"']").click();
		}

		if(initCityVal!=""){
			$(opts.domSelect[1]).find("ul li[data-value='"+initCityVal+"']").click();
		}

		if(initAreaVal!=""){
			$(opts.domSelect[2]).find("ul li[data-value='"+initAreaVal+"']").click();
		}
		
		
	}
	
}
