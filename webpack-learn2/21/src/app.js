// Less在webpack.config.js的resolve做了别名处理
import 'Less/base.less'
import $ from 'jquery'
import Hubilder from 'Lib/jquery-module'
console.log(Hubilder)
console.log('$', $)

var app = document.getElementById('app')
var div = document.createElement('div')
div.className = 'box'
app.appendChild(div)
console.log(process.env.NODE_ENV)

$.ajax({
    url: '/api/comments/show',
    type: 'GET',
    data: {
        id: 4193586758833502,
        page: 1
    },
    success: function (res) {
        console.log(res)
    }
})

require.ensure(['./js/async.js'], function () {
    var async = require('./js/async.js')
    console.log('async', async)
}, 'async')