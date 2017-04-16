;(function(){
	$(document).on('click','.gf-select > span',function(){
		//closest先查找自己,再往上查找父元素,如果找到了第一个匹配的就返回
		$(this).closest('.gf-select').css({'zIndex':100});
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
		var parent = $(this).closest('ul');
		var select = $(this).closet('.gf-select');
		var value = $(this).attr('data-value');
		var text = $(this).text();
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
		//console.log(item)
		$(opts.domSelect[0]).find('ul').html(item.join("\n"));
		
		$jsondata = json;
		
		
	}
	
}
