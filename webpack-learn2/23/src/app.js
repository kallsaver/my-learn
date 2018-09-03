require.include('jquery');

import 'babel-polyfill';
import base from 'Less/base.less';
import header from './js/components/header';
import $ from 'jquery';
console.log('$', $);

import Vue from 'vue'
import App from './App.vue'

new Vue({
    el: '#app',
    components: {
        App
    },
    template: '<App/>'
})

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
});

require.ensure(['./js/async.js'], function () {
    var async = require('./js/async.js');
    console.log('async', async);
}, 'async');