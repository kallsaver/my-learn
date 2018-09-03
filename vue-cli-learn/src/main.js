import Vue from 'vue';
import App from './App'
import '@/common/style.css'
import axios from 'axios'


Vue.config.productionTip = false

let a = [1, 2, 3]

let promise = function getData () {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: '/inter/comments/show',
      params: {
        id: 4193586758833502,
        page: 1
      }
    }).then((data) => {
      resolve(data)
    })
  })
}

promise().then((data) => {
  console.log(data)
})

console.log(222)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
