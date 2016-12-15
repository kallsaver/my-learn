/*自定义指令是可以访问到myCtrl控制器的scope
要想把word自定义指令独立作用域,也就是说跟mytest切断关系:可以加上指令的参数scope:{},这样就能做到互不相干了
但是也不可能完成切断关系,总会有某些东西要互相交互,如果想跟mytest控制器的某个scope属性交互,就要用绑定策略*/

angular.module("myapp",[])

angular.module("myapp").controller("myCtrl",function($scope){
	$scope.name="likang";
	$scope.run=function(a){
		alert(a)
		console.log(this)
	}
	$scope.wordclickhandle=function(word){
		if (word.hasClass("highlight")) {
			word.removeClass("highlight");
		} else {
			word.addClass("highlight");
		}
	}		//wordclickhandle是个变量  所以用"="
	
})

angular.module("myapp").directive("word",function(){
	return {
		restrict:"EA",   //取值有E(元素),A(属性),C(class),M(注释)  A是默认值   也可以多个一起用
		replace:false,	 //是否把替换word在结构中注释处理
		transclude:true,//如果不想让指令内部的内容被模板替换,可以设置这个值为true。一般情况下需要和ngTransclude指令一起使用。
		templateUrl:"replace.html",
		//网上说的scope和上面的$scope隔离是错误的  在html页面隔离不了  而在directive函数内部本身就是隔离的(两个兄弟函数)
		//<word>的jq对象依然遵循myCtrl的作用域    但是<word>templateUrl的jq对象的作用域是下面的作用域
		scope:{
			//@字符串 &函数  =变量	wordclickhandle是个变量  所以用"="  wordclickhandle拿到onwordclick的引用地址
			onwordclick:"="	,	// wordclickhandle是<word>里写的,不是在templateUrl写的 所以可以访问到	myCtrl	 
			
		},
		controller:function($scope){		//这个controller是<word>templateUrl的控制器
			$scope.name="templateUrl"
		},
		//load -- compile -- link		//有多少个word 这个函数就执行多少遍
		link:function(scope,element,attr,controller,transclude){
			var text;
			//console.log(scope.name)				//scope是<word>templateUrl控制器的$scope
			//console.log(element.html())		//element是<word>templateUrl的jq对象
			//console.log(attr["text"])			//attr是存放<word>自定义属性的一个对象
			//transclue是个交互函数  第一个参数是scope 第二个参数是回调函数  
			//scope是<word>templateUrl控制器的$scope,wordObj却不是<word>templateUrl,而是<word>
			transclude(scope, function(wordObj){
				//console.log(scope.name)		//scope是<word>templateUrl控制器的$scope
				//if(clone==element){alert(1)}
				//console.log(clone.html())		//wordObj是<word>的jq对象
				text = attr["text"] || wordObj.html();	//惰性求值
			})
			//console.log(text)
			text=text.replace(/\w+/g,function(item){	//每个单词都嵌套在<w></w>中
				return "<w>"+item+"</w>"
			})
			//把text放入结构中    应该放在<word>templateUrl的jq对象中  这里放在第二个div中
			//console.log(element.find("word"))	//<word>templateUrl包括<word>
			//console.log(element.find("div")) //eq()是从0开始的   也可以从-1倒数算起
			//element.find("div").eq(1).html(text)	//element.find("div").eq(-1).html(text)
			var secondDiv=element.find("div").eq(1);
			secondDiv.html(text);
			
			secondDiv.find("w").on("click",function(){
				//console.log(this) this是jq对象
				var word=angular.element(this)   //转为angular阉割版jq对象
				if (scope.onwordclick !== undefined)scope.onwordclick(word);	//word传参到html页面的wordclickhandle函数			
			})
		}
	}
})
