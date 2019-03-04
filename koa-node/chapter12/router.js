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

  router.post('/user/register', async (ctx, next) => {
    let params = ctx.request.body
    let name = params.name
    let password = params.password
    let res = await HomeService.register(name, password)
    if (res.status == "-1") {
      await ctx.render("home/login", res.data)
    } else {
      ctx.state.title = "个人中心"
      console.log('res', res.data)
      await ctx.render("home/success", res.data)
    }
  })

  app.use(router.routes()).use(router.allowedMethods())
}
