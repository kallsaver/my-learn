import base from './less/base.less';
import common from './less/common.less';
console.log(base);
var app = document.getElementById('app');
app.innerHTML = '<div class="'+ base.box + '"></div>';

import(/* webpackChunkName:'a' */ './components/a.js').then(function(a){
    console.log('异步加载a.js');
});