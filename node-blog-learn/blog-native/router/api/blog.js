const koa = require('../../plugins/koa/index')
const router = koa.Router()

const {
  blogListGet,
  blogDetailGet,
  blogCreate,
  blogUpdate,
  blogDelete,
} = require('../../controller/blog')

const {
  SuccessModel,
  ErrorModel,
} = require('../../model/res-model')

const loginMiddle = require('../../middleware/login')

router.prefixer = '/api/blog'

router.get('/list', async (req, res, next) => {
  const query = req.query

  const author = query.author || ''
  const keyword = query.keyword || ''

  const [err, ret] = await blogListGet(author, keyword)
  if (err) {
    res.body = new ErrorModel(err)
    return
  }
  res.body = new SuccessModel(ret)
})

router.get('/detail', async (req, res) => {
  const query = req.query

  const id = query.id

  const validate = {
    id,
  }

  for (const key in validate) {
    if (!validate[key]) {
      res.body = new ErrorModel(`${key} missing`)
      return
    }
  }

  const [err, ret] = await blogDetailGet(id)
  if (err) {
    res.body = new ErrorModel(err)
    return
  }

  res.body = new SuccessModel(ret)
})

router.post('/create', async (req, res) => {
  const body = req.body

  const blogData = {
    title: body.title,
    content: body.content,
    author: body.author,
    createTime: new Date().getTime(),
  }

  const validate = {
    ...blogData,
  }

  for (const key in validate) {
    if (!validate[key]) {
      res.body = new ErrorModel(`${key} missing`)
      return
    }
  }

  const [err, ret] = await blogCreate(blogData)
  if (err) {
    res.body = new ErrorModel(err)
    return
  }

  res.body = new SuccessModel(ret)
})

router.post('/update', async (req, res) => {
  const body = req.body

  const id = body.id

  const blogData = {
    title: body.title,
    content: body.content,
    author: body.author
  }

  const validate = {
    id: id,
    ...blogData,
  }

  for (const key in validate) {
    if (!validate[key]) {
      res.body = new ErrorModel(`${key} missing`)
      return
    }
  }

  const [err, ret] = await blogUpdate(id, blogData)
  if (err) {
    res.body = new ErrorModel(err)
    return
  }

  res.body = new SuccessModel(ret)
})

router.post('/delete', async (req, res, next) => {
  const body = req.body

  const id = body.id
  const author = body.author

  const validate = {
    id: id,
    author: author
  }

  for (const key in validate) {
    if (!validate[key]) {
      res.body = new ErrorModel(`${key} missing`)
      return
    }
  }

  const [err, ret] = await blogDelete(id, author)
  if (err) {
    res.body = new ErrorModel(err)
    return
  }

  res.body = new SuccessModel(ret)
})

module.exports = router
