// signal from master to worker 
const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN';
const SET_JSAPI_TOKEN = 'SET_JSAPI_TOKEN';

// signal from worker to master
const PING_MASTER = 'PING_MASTER';
const SCANED_QRCODE_CALLBACK = 'SCANED_QRCODE_CALLBACK';
const AUTH_SUCCESS = 'AUTH_SUCCESS';

const handler = {
  [SET_ACCESS_TOKEN](access_token) {
    global.access_token = access_token;
    console.log(`process #${process.pid} refresh access_token`);
  },
  [SET_JSAPI_TOKEN](jsapi_token) {
    global.jsapi_token = jsapi_token;
    console.log(`process #${process.pid} refresh jsapi_token`);
  },

  [PING_MASTER]() {
    console.log(`process #${process.pid} has pipe to master`);
  },
  [SCANED_QRCODE_CALLBACK](io, { userId }) {
    global.io.sockets.to(userId).emit('scaned_qrcode_callback');
  },
  [AUTH_SUCCESS](io, { userId, userinfo }) {
    global.io.sockets.to(userId).emit('auth_success', userinfo);
  }
}

module.exports = {
  SET_ACCESS_TOKEN,
  SET_JSAPI_TOKEN,

  PING_MASTER,
  SCANED_QRCODE_CALLBACK,
  AUTH_SUCCESS,

  handler
}