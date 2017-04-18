// 多级关联就是第一级的数据是已经写好的
// 选中第一级的数据,第二级的数据才开始插入

function multiRelative(options){
	// 多级关联的页面点击交互
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
			var select = $this.closest('.gf-select');
			// value拿到城市的id
			var value = $this.attr('data-value');
			var text = $this.text();
	
			// em显示控件的文本是li的文本
			select.find('em').html(text);
			// input存入
			select.find("input[type='hidden']").val(value);
			//select.find("input[type='hidden']").val(value !== 0 ? value : '');
			parent.hide();
			
		});
		
		// 点击.gf-select以外的区域,ul选项列表隐藏
		$(document).on("click",function(e){
			// closest的事件委托写法
			if($(e.target).closest(".gf-select").length === 0){
				//$(".gf-select").css("z-index",1);
				$(".gf-select ul").hide();
			}
		});
		
	})();
	
	// 多级关联的数据模块
	options = options || {};
	var config = {
		element : ["#province","#city","#area"],
		defaultText : ["请选择省份","请选择城市","请选择区县"]
	}
	
	var opts = $.extend(config,options);
	
	var $jsondata = {};
	
	var ajaxConfig = {
		url : "allcity.js",
		dataType : "jsonp",
		jsonpCallback : "callback",
		success : initProvince				
	};
	$.ajax(ajaxConfig);
	
	function initProvince(json){
		// 用一个全局变量接受json,以便在事件监听中使用这个数据
		$jsondata = json;
		var item = ['<li>' + opts.defaultText[0] + '</li>'];
		var data = json['province'];
		// 预设都是空
		var initProvinVal = $(opts.element[0]).find('input').val();
		var initCityVal = $(opts.element[1]).find('input').val();
		var initAreaVal = $(opts.element[2]).find('input').val();
		
		for(var i = 0; i < data.length; i++){
			// data-value和name存入的都是id
			item.push('<li data-value="'+data[i]["id"]+'" name="'+data[i]["id"]+'">'+data[i]["name"]+'</li>');
		}
		// 在第一个ul中插入省份和直辖市
		$(opts.element[0]).find('ul').html(item.join("\n"));  //或者join('')
		
		// 如果初始化时input已经有有默认值了,那么触发父元素li的点击事件
		if(initProvinVal!=""){
			$(opts.element[0]).find("ul li[data-value='"+initProvinVal+"']").click();
		}

		if(initCityVal!=""){
			$(opts.element[1]).find("ul li[data-value='"+initCityVal+"']").click();
		}

		if(initAreaVal!=""){
			$(opts.element[2]).find("ul li[data-value='"+initAreaVal+"']").click();
		}
	}
	
	function cityRelative(){
		var item = ['<li>'+opts.defaultText[1]+'</li>'];
		var name = $(this).attr('name');
		// 判断是否相等的运算符的优先级要高于&&和||
		// 如果name存在并且name不等于空
		if( name && name !== ''){
			// 拿城市列表
			var data = $jsondata['city'][name];
			// 在第二个ul中插入城市
			for(var i = 0; i < data.length ; i++){
				item.push('<li data-value="'+data[i]["id"]+'" name="'+data[i]["id"]+'">'+data[i]["name"]+'</li>');
			}
			$(opts.element[1]).find("ul").html(item.join("\n"));
		}else{
			$(opts.element[1]).find("ul").html(item.join("\n"));
		}	
		$(opts.element[1]).find("ul li:first").trigger("click");
	}
	
	
	function areaRelative(){
		var item = ['<li>'+opts.defaultText[2]+'</li>'];
		var name = $(this).attr("name");
		if(name && name != ""){
			var data = $jsondata["district"][name];
			for(var i=0;i<data.length;i++){
				item.push('<li data-value="'+data[i]["id"]+'" name="'+data[i]["id"]+'">'+data[i]["name"]+'</li>');
			}
			$(opts.element[2]).find("ul").html(item.join("\n"));				
		}else{
			$(opts.element[2]).find("ul").html(item.join("\n"));							
		}
		$(opts.element[2]).find("ul li:first").trigger("click");
		
	}
	
	$(document).on("click",opts.element[0]+" li",cityRelative);
	$(document).on("click",opts.element[1]+" li",areaRelative);			
}
