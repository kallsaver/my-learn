const Koa = require('koa');
const Router = require('koa-router');
const views = require('koa-views');
const path = require('path');

const port = 8777;
const app = new Koa();

const homeRouter = new Router();
const userRouter = new Router();

homeRouter.get('/', async (ctx, next) => {
  await ctx.render('home', {
    title: 'Hello Koa 2!'
  })
});

userRouter.get('/user', async (ctx, next) => {
  await ctx.render('user', {
    title: 'user!'
  })
});

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}));

app.use(homeRouter.routes(), homeRouter.allowedMethods());
app.use(userRouter.routes(), userRouter.allowedMethods());

app.listen(port);

console.log(`service in localhost:${port}`);
