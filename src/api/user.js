const {
  success,
  request_error,
  error,
  server_error
} = require('../../lib').response;

const request = require('../../lib').request;
const sqlAct = require('../../lib').sqlAct;

const infos = async (ctx, next) => {
  try {
    let data = await sqlAct('SELECT * FROM user');

    ctx.body = success({
      data
    });
  } catch (e) {
    ctx.body = server_error(e);
  }
}

const login = async (ctx, next) => {
  try {
    const req = ctx.request.body;
    let data = await sqlAct('SELECT * FROM user');
    let message;
    let res = data.find(v =>{
      return v.name == req.account
    })
    if(res){
      if(res.password == req.password){
        message = res;
      }
      else{
        message ='密码错误';
      }
    }
    else {
      message = '未找到此用户'
    }
    ctx.response.body = success({
      message
    });
  } catch (e) {
    ctx.body = server_error(e);
  }
}

const register = async(ctx, next) =>{
  try {
    const req = ctx.request.body;   
    ctx.response.body = success({
      req
    });
    let data = await sqlAct('INSERT INTO user(name,password,email,phone) VALUES('+req.name+','+req.password+','+req.email+','+req.phone+')'); 
  } catch (e) {
    ctx.body = server_error(e);
  }
}

module.exports = {
  infos,
  login,
  register
};