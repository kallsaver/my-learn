// //路径一定要写"./"表示当前目录
// //var name = require('./name');
// //标准的模块写法
// import name from './name.js';
// import k from './src/01.js';
//
// //使用style-loader和css-loader编译 没有使用webpack.config.js的情况
// //插件和插件用!分隔符  然后css-loader!.style.css因为后面的是要读取的文件,也要用分隔符隔开
// //require('style-loader!css-loader!./style.css');
//
// //使用了webpack.config.js的情况
// //require('./style.css');
// import './style.css' ;
//
// document.getElementById('app').textContent = "hello ~" +name+k;


'use strict';

import React from "react";
import ReactDOM from "react-dom";
import Name from "./name.js";
import './style.css' ;

//把name组件插入到id为app的DOM元素中
ReactDOM.render(
  <Name />,
  document.getElementById("app")
)
