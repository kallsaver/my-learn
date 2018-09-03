import {
  jsonp,
  commonParams,
  API_OK,
  API_ERROR,
  apiHandler,
} from './config'

import axios from 'axios'

const baseURL = process.env.baseURL

const instance = axios.create({
  baseURL: baseURL,
  validateStatus(status) {
    // 默认的status在200~300会Promise.resolve(res)
    // return status >= 200 && status < 300
    // 但是这个方法只是针对statusCode,不能对自定义的code做处理
    // 统一在instance.interceptors.response设置
    return true
  }
})

// 响应拦截器,对404等或者后端自定义的code错误
instance.interceptors.response.use((response) => {
  // 根据后台设置的code逻辑做处理
  if ((response.status === 200 || response.status === '200') && response.data.code === API_OK) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(API_ERROR)
  }
})

// jsonp接口
export function getRecommend(params) {
  const data = Object.assign({}, commonParams, params)
  return apiHandler(() => {
    // url是基础url, data是url参数, options是jsonp的回调参数
    return jsonp({
      url: 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg',
      data: data,
    })
  })
}

export function getDiscList(params) {
  const data = Object.assign({}, commonParams, params)
  return apiHandler(() => {
    return instance({
      method: 'get',
      url: 'splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg',
      params: data
    }).then((res) => {
      return Promise.resolve(res.data)
    })
  })
}
