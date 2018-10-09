import axios from 'axios';
import Vue from 'vue';
const PromiseRetryer = require('promise-retryer')(Promise);
const AjaxBus = new Vue();

const LOSTOKEN = 'lost token';
let oldToken = '123';
let newToken = '456';

const STATUSCODE_ERROR = 'STATUSCODE_ERROR';

let header = {
  token: oldToken
};

function getNewToken() {
  header.token = newToken;
}

// 不要在Promise.reslove的参数中使用new Error(xxx),这会使得参数不是正常类型
// 难以后续对参数进行判断
// 请使用Promise.reslove(基本数据类型);
// 中间的Promise.reslove使用上游传过来的参数,避免重新开启新的参数
// 而实际上开发应用我们不需要错误,而是一个提交做出处理


// 请求拦截器
axios.interceptors.request.use(config => {
  // console.log('config', config);
  // if (config.params.page === 1) {
  //   console.log(666);
  //   return Promise.reject('page === 1');
  // }
  return Promise.resolve(config);
}, tip => {
  return Promise.reject(tip);
});

// 响应拦截
axios.interceptors.response.use(response => {
  // 对响应数据做点什么
  if (response.status === 200 && header.token !== oldToken) {
    // return Promise.reject(LOSTOKEN);
    return Promise.resolve(response);
  } else if (header.token === oldToken) {
    console.log('token过期');
    getNewToken();
    return Promise.reject(LOSTOKEN);
    // 可以全局也可以根据reject的指向做局部接口getNewToken
  } else {
    return Promise.reject(STATUSCODE_ERROR);
  }
}, tip => {
  // 对响应错误做点什么
  return Promise.reject(tip);
});

// 统一ajax请求的函数
function API(callback) {
  return new Promise((resolve, reject) => {
    PromiseRetryer.run({
      // 如果失败重写请求的时间间隔
      delay: 2000,
      maxRetries: 5,
      promise(attempt) {
        return new Promise((resolve, reject) => {
          callback().then((data) => {
            resolve(data);
          }).catch((tip) => {
            // if (tip === LOSTOKEN) {
            //   console.log('token 过期');
            //   // 可以全局拦截处理
            //   getNewToken();
            // }
            reject(tip);
          });
        });
      }
    }).then((data) => {
      resolve(data);
    }).catch(() => {
      AjaxBus.$createBodyTransitionDemo({
        onHide() {
          console.log('请设置网络');
        }
      }).show();
      // 如果使用了Promise.reject(new Error())不让Promise的reject错误上抛
      // console.error('统一的错误处理');
    });
  });
}

export function getComments(params) {
  return API(() => {
    return axios({
      url: '/api/comments/show',
      method: 'get',
      params: params,
    });
  });
};




