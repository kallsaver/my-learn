require.config({
	//baseUrl:"../lib/jquery-3.1.0",	//默认根js文件
	paths:{
		underscore:"../lib/underscore",	//从config这个文件找a.js的地址
		jquery:"../lib/jquery-3.1.0",
		backbone:"../lib/backbone"
	},
	shim: {								//加载的模块,必须按照AMD模块规范来写,shim是配置不兼容的模块
　　　　　　'underscore':{
　　　　　　　　exports: '_'
　　　　　　},
　　　　　　'backbone': {
　　　　　　　　deps: ['underscore', 'jquery'],
　　　　　　　　exports: 'backbone'
　　　　　　}
　　　　}	
})
//这个模块对underscore,jquery,backbone有依赖
require(["underscore","jquery","backbone"],function(_,$,backbone){ 
	$(function(){
		alert(1)
	})
	
})
