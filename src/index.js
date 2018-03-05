const Koa = require('koa');
const app = new Koa();

// app.use(require('koa-xml-body')());
// app.use(require('koa-bodyparser')());
app.use(require('./router').routes());

module.exports = app;