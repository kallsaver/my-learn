requirejs.config({
	//定义基本路径,如果没有这个参数,main.js为基本路径
	//baseUrl : 'lib', paths下的lib都可以删掉
	//通过paths来定义所依赖的基本库的位置,可以先引入cdn上的,失败会再加载本地的
	paths : {
		//匿名模块名就是路径名,而paths的作用是简略路径名
		'jquery' : 'lib/jquery-3.1.0',
		'bootstrap' : [
			'//cdn.bootcss.com/bootstrap/3.3.4/js/bootstrap',
			'lib/bootstrap'
		],
		'underscore' : 'lib/underscore',
		'backbone' : 'lib/backbone',
		'a' : 'lib/a',
		'b' : 'lib/b',
		'c' : 'lib/c',
		'jquery.scroll' : 'lib/jquery.scroll'
	},
	//定义依赖关系和不符合AMD规范模块的引入
	shim : {
		//bootstrap.js是要依赖jquery.js的
		'bootstrap' : ['jquery'],
		//新版本的backbone(这个版本)是符合AMD规范的
		'backbone' : {
			deps : ['underscore','jquery'],
			//老版本backbone和underscore都是不符合AMD规范的,所以都用到了导出,后面依赖的时候就可以直接使用了
			//exports : 'Backbon'
		},
		//新版本的underscore(这个版本)是符合AMD规范的
		'underscore' : {
			//exports : 'un'   //可以自定义的名字  用"_"是官方的
		},
		'jquery.scroll' : {
			deps : ['jquery'],
			//在jquery.scroll.js中找 jQuery.fn.scroll,
			//这个js文件的exports = jQuery.fn.scroll;
			//exports = jQuery也是可以的,exports = "D"也是可以的
			//不过这个D必须是全局变量(在main.js中可以访问的)
			//exports : 'D'
			exports : 'jQuery.fn.scroll'
		}
	}
});


//启用jquery,underscore,bootstrap的jquery插件  
//bootstrap.js因为这个模块没有返回值,所以bootstrap是undefined
//requirejs和require都可以
//注入后模块会运行,再运行require中的回调函数,
//jquery,u,bootstrap,a,b是模块运行的返回值或者是AMD规范,只是个形参,随便给名字,但是和左边一一对应
require(['jquery','underscore','bootstrap','a','b'],function(j,u,bootstrap,a,b){
	console.log(j);
	console.log(u);
	console.log(a);
	console.log(b);
	console.log(a.isEqual(4,5))
		//bootstrap是jq的插件,是给jq加方法的,console.log(bootstrap);
	$('#div').css({"background":"red","width":"100px","height":"100px"})
});
require(['c','jquery.scroll'],function(c,fn){
	console.log(c);
	setTimeout(function(){
		console.log(c.product)  //
	},1000);
	console.log(fn)
	$("div").on("click",function(){
		$(this).scroll()
	})
});

require(['underscore'],function(c){
	console.log(c);
});






