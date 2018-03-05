
const { success, request_error, error, server_error } = require('../../lib').response;

const request = require('../../lib').request;


const infos = async (ctx, next) => {
  ctx.body = success({
    user:{
        'test':'test'
    }
  });
  console.log(`api:user_Infos run at ${process.pid}`);
  // return next(); 
}

module.exports = {
  infos
};