const Koa = require('koa');
const app = new Koa();

// app.use(require('koa-xml-body')());
// app.use(require('koa-bodyparser')());
app.use((ctx, next) => {
  console.log(`process #${process.pid}: ${ctx.method} - ${ctx.url}`);
  return next();
});
app.use(require('./router').routes());

module.exports = app;