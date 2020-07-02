const router = require('koa-router')()

const {
  blogListGet,
  blogDetailGet,
  blogCreate,
  blogUpdate,
  blogDelete,
} = require('../controller/blog')

const {
  SuccessModel,
  ErrorModel,
} = require('../model/res-model')

router.prefix('/blog')

function checkValidate(ctx, validate, next) {
  for (const key in validate) {
    if (!validate[key]) {
      console.log(11)
      ctx.body = new ErrorModel(`${key} missing`)
    }
  }
}

router.get('/list', async (ctx, next) => {
  const query = ctx.query

  const author = query.author || ''
  const keyword = query.keyword || ''

  const [err, ret] = await blogListGet(author, keyword)
  if (err) {
    ctx.body = new ErrorModel(err)
    return
  }
  ctx.body = new SuccessModel(ret)
})

router.get('/detail', async (ctx, next) => {
  const query = ctx.query

  const id = query.id

  const validate = {
    id,
  }

  // for (const key in validate) {
  //   if (!validate[key]) {
  //     ctx.body = new ErrorModel(`${key} missing`)
  //     return
  //   }
  // }

  await checkValidate(ctx, validate)

  const [err, ret] = await blogDetailGet(id)
  if (err) {
    ctx.body = new ErrorModel(err)
    return
  }

  ctx.body = new SuccessModel(ret)
})

router.post('/create', async (ctx, next) => {
  const body = ctx.request.body

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
      ctx.body = new ErrorModel(`${key} missing`)
      return
    }
  }

  const [err, ret] = await blogCreate(blogData)
  if (err) {
    ctx.body = new ErrorModel(err)
    return
  }

  ctx.body = new SuccessModel(ret)
})

router.post('/update', async (ctx, next) => {
  const body = ctx.request.body

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
      ctx.body = new ErrorModel(`${key} missing`)
      return
    }
  }

  const [err, ret] = await blogUpdate(id, blogData)
  if (err) {
    ctx.body = new ErrorModel(err)
    return
  }

  ctx.body = new SuccessModel(ret)
})

router.post('/delete', async (ctx, next) => {
  const body = ctx.request.body

  const id = body.id
  const author = body.author

  const validate = {
    id: id,
    author: author
  }

  for (const key in validate) {
    if (!validate[key]) {
      ctx.body = new ErrorModel(`${key} missing`)
      return
    }
  }

  const [err, ret] = await blogDelete(id, author)
  if (err) {
    ctx.body = new ErrorModel(err)
    return
  }

  ctx.body = new SuccessModel(ret)
})

module.exports = router
