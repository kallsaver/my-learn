// Less在webpack.config.js的resolve做了别名处理
import base from 'Less/base.less';
console.log('$',$);

var app = document.getElementById('app');
var div = document.createElement('div');
div.className = 'box';
app.appendChild(div);

$.ajax({
    url: '/api/comments/show',
    type: 'GET',
    data: {
        id: 4193586758833502,
        page: 1
    },
    success: function(res){
        console.log(res)
    }
});

require.ensure(['./src/js/async.js'],function(){
    var async = require('./src/js/async.js');
    console.log('async',async);
},'async');