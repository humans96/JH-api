const {
  success,
  request_error,
  error,
  server_error
} = require('../../lib').response;

const request = require('../../lib').request;
const formateUrl = require('../../lib').tools.format_params;
const {sqlQuery, sqlInsert, formate} = require('../../lib').sql;

const productList = async (ctx, next) => {
  try {
    let data = await sqlQuery('SELECT `name` FROM `product` ORDER BY id DESC');
    ctx.body = success({
      data
    });
  } catch (e) {
    ctx.body = server_error(e);
  }
}

const allProduct = async (ctx, next) => {
  try {
    let data = await sqlQuery('SELECT * FROM `product` ORDER BY id DESC');
    ctx.body = success({
      data
    });
  } catch (e) {
    ctx.body = server_error(e);
  }
}

const editProduct = async (ctx, next) => {
  try {
    let sq = ctx.request.body;
    let data = await sqlInsert('UPDATE `product` SET name = ?,image = ?, price = ?, stock = ?, switch = ?, detail = ?, function = ? , packing =?  WHERE id = ?',[sq.name, sq.image, sq.price, sq.stock, JSON.stringify(sq.switch), JSON.stringify(sq.detail), JSON.stringify(sq.function), JSON.stringify(sq.packing), sq.id]);
    ctx.body = success({
      data
    });
  } catch (e) {
    ctx.body = server_error(e);
  }
}

const addProduct = async (ctx, next) => {
  try {
    let sq = ctx.request.body;
    let data = await sqlInsert('INSERT INTO `product` SET name = ?,image = ?, price = ?, stock = ?, switch = ?, detail = ?, function = ? , packing =?',[sq.name, sq.image, sq.price, sq.stock, JSON.stringify(sq.switch), JSON.stringify(sq.detail), JSON.stringify(sq.function), JSON.stringify(sq.packing)]);
    ctx.body = success({
      data
    });
  } catch (e) {
    ctx.body = server_error(e);
  }
}

const detail = async (ctx, next) => {
  try {
    let sq = formate(ctx.request.url);
    sq = decodeURI(sq);
    let data = await sqlQuery('SELECT * FROM `product` WHERE '+ sq);
    ctx.body = success({
      data
    });
  } catch (e) {
    ctx.body = server_error(e);
  }
}

const order = async (ctx, next) => {
  try {
    let data = await sqlQuery('SELECT * FROM `order`');
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
    let data = await sqlQuery('SELECT * FROM `cartinfo` WHERE' + sq);
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
    let data = await sqlInsert('INSERT INTO `cart` SET ?', req);
    ctx.body = success({
      data
    });
  } catch (e) {
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
    ctx.body = server_error(e);
  }
}

const cancelOrder = async (ctx, next) => {
  try {
    let sq = formate(ctx.request.url);
    let data = await sqlInsert('UPDATE `order` SET status = ?  WHERE id = ?',["Closed",JSON.parse(sq.split('=')[1])]); 
    ctx.body = success(
      data
    );
  } catch (e) {
    ctx.body = server_error(e);
  }
}

module.exports = {
  productList,
  addProduct,
  editProduct,
  allProduct,
  detail,
  order,
  getOrderInfo,
  cart,
  cartDelete,
  addCart,
  placeOrder,
  cancelOrder
};