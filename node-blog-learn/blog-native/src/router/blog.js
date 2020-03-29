const {
  getList,
  getDetail,
  newBlog,
  updateBolg,
  deleteBolg
} = require('../controller/blog')

const {
  SuccessModel,
  ErrorModel
} = require('../model/res-model')

const blogRouterHandler = (req, res) => {
  // 原生的
  const method = req.method
  // 扩展的
  const reqPath = req.reqPath

  // api接口
  if (method === 'GET') {
    if (reqPath === '/api/blog/list') {
      const author = req.query.author || ''
      const keyword = req.query.keyword || ''
      const data = getList(author, keyword)
      return new SuccessModel(data)
    } else if (reqPath === '/api/blog/detail') {
      const id = req.query.id
      let data = getDetail(id)
      return new SuccessModel(data)
    }
  } else if (method === 'POST') {
    if (reqPath === '/api/blog/new') {
      const postData = req.body
      const data = newBlog(postData)
      return new SuccessModel(data)
    } else if (reqPath === '/api/blog/update') {
      const id = req.query.id
      const postData = req.body
      const result = updateBolg(id, postData)
      if (result) {
        return new SuccessModel()
      } else {
        return new ErrorModel()
      }
    } else if (reqPath === '/api/blog/delete') {
      const id = req.query.id
      const result = deleteBolg(id)
      if (result) {
        return new SuccessModel()
      } else {
        return new ErrorModel()
      }
    }
  }
  return null
}

module.exports = blogRouterHandler
