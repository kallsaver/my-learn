const express = require('../../plugins/express/index')
const router = express.Router()

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

router.get('/list', async (req, res) => {
  const query = req.query

  const author = query.author || ''
  const keyword = query.keyword || ''

  const [err, ret] = await blogListGet(author, keyword)
  if (err) {
    const result = new ErrorModel(null, err)
    res.setHeader('Conent-Type', 'application/json')
    res.end(JSON.stringify(result))
    return
  }

  const result = new SuccessModel(ret)
  res.setHeader('Conent-Type', 'application/json')
  res.end(JSON.stringify(result))
})

router.get('/detail', async (req, res) => {
  const query = req.query

  const id = query.id

  const validate = {
    id,
  }

  for (const key in validate) {
    if (!validate[key]) {
      const result = new ErrorModel(null, `${key} missing`)
      res.setHeader('Conent-Type', 'application/json')
      res.end(JSON.stringify(result))
      return
    }
  }

  const [err, ret] = await blogDetailGet(id)
  if (err) {
    const result = new ErrorModel(null, err)
    res.setHeader('Conent-Type', 'application/json')
    res.end(JSON.stringify(result))
    return
  }

  const result = new SuccessModel(ret)
  res.setHeader('Conent-Type', 'application/json')
  res.end(JSON.stringify(result))
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
      const result = new ErrorModel(null, `${key} missing`)
      res.setHeader('Conent-Type', 'application/json')
      res.end(JSON.stringify(result))
      return
    }
  }

  const [err, ret] = await blogCreate(blogData)
  if (err) {
    const result = new ErrorModel(null, err)
    res.setHeader('Conent-Type', 'application/json')
    res.end(JSON.stringify(result))
    return
  }

  const result = new SuccessModel(ret)
  res.setHeader('Conent-Type', 'application/json')
  res.end(JSON.stringify(result))
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
      const result = new ErrorModel(null, `${key} missing`)
      res.setHeader('Conent-Type', 'application/json')
      res.end(JSON.stringify(result))
      return
    }
  }

  const [err, ret] = await blogUpdate(id, blogData)
  if (err) {
    const result = new ErrorModel(null, err)
    res.setHeader('Conent-Type', 'application/json')
    res.end(JSON.stringify(result))
    return
  }

  const result = new SuccessModel(ret)
  res.setHeader('Conent-Type', 'application/json')
  res.end(JSON.stringify(result))
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
      const result = new ErrorModel(null, `${key} missing`)
      res.setHeader('Conent-Type', 'application/json')
      res.end(JSON.stringify(result))
      return
    }
  }

  const [err, ret] = await blogDelete(id, author)
  if (err) {
    const result = new ErrorModel(null, err)
    res.setHeader('Conent-Type', 'application/json')
    res.end(JSON.stringify(result))
    return
  }

  const result = new SuccessModel(ret)
  res.setHeader('Conent-Type', 'application/json')
  res.end(JSON.stringify(result))
}, () => {
  console.log(11)
})

module.exports = router
