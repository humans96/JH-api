const {
  success,
  request_error,
  error,
  server_error
} = require('../../lib').response;

const request = require('../../lib').request;
const sqlAct = require('../../lib').sqlAct;

const infos = async ctx => {
  let data = await sqlAct('SELECT * FROM test');

  ctx.body = success({
    data
  });
  console.log(`api:user_Infos run at ${process.pid}`);
}

module.exports = {
  infos
};