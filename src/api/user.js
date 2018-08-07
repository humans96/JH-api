const {
  success,
  request_error,
  error,
  server_error
} = require('../../lib').response;

const request = require('../../lib').request;
const {
  sqlQuery,
  sqlInsert,
  formate
} = require('../../lib').sql;
const guid = require('../../lib').tools.guid;

const check = async (ctx, next) => {
  try {
    let sq = formate(ctx.request.url);
    let data = await sqlQuery('SELECT * FROM `user` WHERE ' + sq);
    ctx.body = success({
      data: data[0]
    });
  } catch (e) {
    ctx.body = server_error(e);
  }
}

const login = async (ctx, next) => {
  try {
    const req = ctx.request.body;
    let data = await sqlQuery('SELECT * FROM user');
    let message;
    let res = data.find(v => {
      return v.name == req.account
    })
    if (res) {
      if (res.password == req.password) {
        message = res;
      } else {
        message = '密码错误';
      }
    } else {
      message = '未找到此用户'
    }
    let uuid = guid();
    ctx.cookies.set('human', uuid, {
      maxAge: 6000
    });
    ctx.response.body = success({
      message,
      uuid
    });
  } catch (e) {
    ctx.body = server_error(e);
  }
}

const register = async (ctx, next) => {
  try {
    const req = ctx.request.body;
    let data = await sqlInsert('INSERT INTO user SET ?', req);
    ctx.response.body = success({
      data
    });
  } catch (e) {
    ctx.body = server_error(e);
  }
}

const updatePwd = async (ctx, next) => {
  try {
    const req = ctx.request.body;
    let checkpwd = await sqlInsert('SELECT * FROM `user` WHERE name = ? ', [req.name]);
    if (checkpwd[0].password == req.oldpwd) {
      let data = await sqlInsert('UPDATE `user` SET password = ?  WHERE name = ?', [req.newpwd, req.name]);
      ctx.response.body = success({
        data
      });
    } else {
      ctx.response.body = success({
        message: '旧密码输入错误'
      });
    }

  } catch (e) {
    ctx.body = server_error(e);
  }
}

const getUserInfo = async (ctx, next) => {
  try {
    let sq = formate(ctx.request.url);
    let data = await sqlQuery('SELECT id  FROM `cart` WHERE' + sq);
    ctx.body = success({
      num: data.length
    });
  } catch (e) {
    ctx.body = server_error(e);
  }
}

const editUser = async (ctx, next) => {
  try {
    let sq = ctx.request.body;
    let data = await sqlInsert('UPDATE `user` SET name = ?, password = ?, phone=?, email = ? WHERE id = ?', [sq.name, sq.password, sq.phone, sq.email, sq.id]);
    ctx.body = success({
      data
    });
  } catch (e) {
    ctx.body = server_error(e);
  }
}

const deleteUser = async (ctx, next) => {
  try {
    let sq = formate(ctx.request.url);
    let data = await sqlQuery('DELETE FROM `user` WHERE' + sq);
    ctx.body = success({
      data
    });
  } catch (e) {
    ctx.body = server_error(e);
  }
}

const allUser = async (ctx, next) => {
  try {
    let data = await sqlQuery('SELECT *  FROM `user`');
    ctx.body = success({
      data
    });
  } catch (e) {
    ctx.body = server_error(e);
  }
}

const getCartNum = async (ctx, next) => {
  try {
    let sq = formate(ctx.request.url);
    let data = await sqlQuery('SELECT id  FROM `cart` WHERE' + sq);
    ctx.body = success({
      num: data.length
    });
  } catch (e) {
    ctx.body = server_error(e);
  }
}

const getOrderNum = async (ctx, next) => {
  try {
    let sq = formate(ctx.request.url);
    let data = await sqlQuery('SELECT status  FROM `order` WHERE' + sq);
    ctx.body = success({
      data
    });
  } catch (e) {
    ctx.body = server_error(e);
  }
}

const getAddress = async (ctx, next) => {
  try {
    let sq = formate(ctx.request.url);
    let data = await sqlQuery('SELECT `address`  FROM `user` WHERE' + sq);
    ctx.body = success(
      data[0]
    );
  } catch (e) {
    ctx.body = server_error(e);
  }
}

const addAddress = async (ctx, next) => {
  try {
    let req = ctx.request.body;
    let address = await sqlQuery('SELECT `address`  FROM `user` WHERE `name` = ' + '"' + req.name + '"');
    if (!address[0].address) {
      address = [req.address];
    } else {
      address = eval(address[0].address);
      address.push(req.address);
    }
    address = JSON.stringify(address);
    let data = await sqlInsert('UPDATE `user` SET address = ?  WHERE name = ?', [address, req.name]);
    ctx.body = success(
      data
    );
  } catch (e) {
    ctx.body = server_error(e);
  }
}

const editAddress = async (ctx, next) => {
  try {
    let req = ctx.request.body;
    let address = await sqlQuery('SELECT `address`  FROM `user` WHERE `name` = ' + '"' + req.name + '"');
    address = eval(address[0].address);
    let ressss = address.filter(item => {
      return JSON.stringify(item) != JSON.stringify(req.old)
    })
    ressss.push(req.new);
    ressss = JSON.stringify(ressss);
    let data = await sqlInsert('UPDATE `user` SET address = ?  WHERE name = ?', [ressss, req.name]);
    ctx.body = success(
      data
    );
  } catch (e) {
    ctx.body = server_error(e);
  }
}

const deleteAddress = async (ctx, next) => {
  try {
    let req = ctx.request.body;
    let address = await sqlQuery('SELECT `address`  FROM `user` WHERE `name` = ' + '"' + req.name + '"');
    address = eval(address[0].address);
    let ressss = address.filter(item => {
      return JSON.stringify(item) != JSON.stringify(req.address)
    })
    ressss = JSON.stringify(ressss);
    let data = await sqlInsert('UPDATE `user` SET address = ?  WHERE name = ?', [ressss, req.name]);
    ctx.body = success(
      data
    );
  } catch (e) {
    ctx.body = server_error(e);
  }
}

module.exports = {
  check,
  login,
  register,
  updatePwd,
  allUser,
  deleteUser,
  editUser,
  getAddress,
  addAddress,
  getCartNum,
  getOrderNum,
  editAddress,
  deleteAddress
};