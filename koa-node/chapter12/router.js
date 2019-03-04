const Router = require('koa-router')
const HomeService = require('./service/register')

const router = new Router()

module.exports = (app) => {
  router.get('/', async (ctx, next) => {
    await ctx.render("home/index", {
      title: "iKcamp欢迎您"
    })
  })

  router.get('/home', async (ctx, next) => {
    ctx.response.body = '<h1>HOME page</h1>'
  })

  router.get('/home/:id/:name', async (ctx, next) => {
    ctx.response.body = '<h1>HOME page /:id/:name</h1>'
  })

  router.get('/user', async (ctx, next) => {
    await ctx.render('home/login', {
      btnName: 'GoGoGo'
    })
  })

  router.get('/api/userInfo', async(ctx, next) => {
    ctx.response.status = 200
    ctx.body = {
      code: 1,
      msg: 'success',
      data: {
        count: 100
      }
    }
  })

  router.post('/api/user/register', async (ctx, next) => {
    ctx.response.status = 200
    let params = ctx.request.body
    let userName = params.userName
    let password = params.password
    let res = await HomeService.register(userName, password)
    if (res.status === 1) {
      ctx.body = {
        code: 1,
        msg: 'success',
        data: res.data
      }
    } else {
      ctx.body = {
        code: 0,
        msg: 'error',
      }
    }
  })

  app.use(router.routes()).use(router.allowedMethods())
}
