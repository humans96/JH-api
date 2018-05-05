const path = require('path');
// console.log('WORKER_NUM',require('os').cpus().length);
module.exports = {
  
  TOKEN_REFRESH_INTERVAL: 7000000,
  LOAD_OLD_TOKEN: true, // make sure open in dev mode
  WORKER_NUM: require('os').cpus().length,
  redis: {
    host: '127.0.0.1',
    port: 6379
  },
  push_keys: {
    access_key: 'secret_key'
  }
}