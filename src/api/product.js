const {
  success,
  request_error,
  error,
  server_error
} = require('../../lib').response;

const request = require('../../lib').request;
const formateUrl = require('../../lib').tools.format_params;
const {sqlQuery, sqlInsert, formate} = require('../../lib').sql;

const detail = async (ctx, next) => {
  try {
    let sq = formate(ctx.request.url);
    sq = decodeURI(sq);
    let data = await sqlQuery('SELECT * FROM `product` WHERE '+ sq);
    console.log('SELECT * FROM `product` WHERE '+ sq);
    ctx.body = success({
      data
    });
  } catch (e) {
    ctx.body = server_error(e);
  }
}

const order = async (ctx, next) => {
  try {
    let sq = formate(ctx.request.url);
    // sq = decodeURI(sq);
    // let data = await sqlQuery('SELECT * FROM `orderInfo` WHERE '+ sq);
    let data = await sqlQuery('SELECT * FROM `orderinfo` WHERE' + sq);
    // console.log('SELECT * FROM `product` WHERE '+ sq);
    ctx.body = success({
      data
    });
  } catch (e) {
    ctx.body = server_error(e);
  }
}

const getOrderInfo = async (ctx, next) => {
  try {
    let sq = formate(ctx.request.url);
    let data = await sqlQuery('SELECT * FROM `order` WHERE' + sq);
    // console.log(data);
    ctx.body = success({
      data
    });
  } catch (e) {
    ctx.body = server_error(e);
  }
}

const cart = async (ctx, next) => {
  try {
    let sq = formate(ctx.request.url);
    // sq = decodeURI(sq);
    // let data = await sqlQuery('SELECT * FROM `orderInfo` WHERE '+ sq);
    let data = await sqlQuery('SELECT * FROM `cartinfo` WHERE' + sq);
    // console.log('SELECT * FROM `product` WHERE '+ sq);
    ctx.body = success({
      data
    });
  } catch (e) {
    ctx.body = server_error(e);
  }
}

const cartDelete = async (ctx, next) => {
  try {
    let sq = formate(ctx.request.url);
    let data = await sqlQuery('DELETE FROM `cart` WHERE' + sq);
    ctx.body = success({
      data
    });
  } catch (e) {
    ctx.body = server_error(e);
  }
}

const addCart = async (ctx, next) => {
  try {
    let req = ctx.request.body;
    // req.address = JSON.stringify(req.address);
    // req.product = JSON.stringify(req.product);
    let data = await sqlInsert('INSERT INTO `cart` SET ?', req);
    ctx.body = success({
      data
    });
  } catch (e) {
    console.log(e);
    ctx.body = server_error(e);
  }
}

const placeOrder = async (ctx, next) => {
  try {
    let req = ctx.request.body;
    req.address = JSON.stringify(req.address);
    req.product = JSON.stringify(req.product);
    let data = await sqlInsert('INSERT INTO `order` SET ?', req);
    ctx.body = success({
      data
    });
  } catch (e) {
    console.log(e);
    ctx.body = server_error(e);
  }
}

module.exports = {
  detail,
  order,
  getOrderInfo,
  cart,
  cartDelete,
  addCart,
  placeOrder
};