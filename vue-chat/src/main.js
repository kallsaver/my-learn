
// 自运行的polyfill
import 'babel-polyfill';
// 需要输出的才用import xxx form 'node_modules/package'
import Vue from 'vue';
import App from './App';
import store from './store';

Vue.config.devtools = true;

new Vue({
	// 挂载在body上
	el : 'body',
	components : { App },
	store : store
})
