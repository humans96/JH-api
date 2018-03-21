const path = require('path');
// console.log('WORKER_NUM',require('os').cpus().length);
module.exports = {
  
  TOKEN_REFRESH_INTERVAL: 7000000,
  LOAD_OLD_TOKEN: true, // make sure open in dev mode
  WORKER_NUM: require('os').cpus().length,
  // ucenter database [postgres]
  // db: {
  //   ucenter: {
  //     dialect: 'postgres',
  //     host: '192.168.1.5',
  //     port: 5432,
  //     database: 'ms',
  //     user: 'ms',
  //     password: 'spiderdt',
  //     idleTimeoutMillis: 30000,
  //     connectionTimeoutMillis: 2000,
  //     max: 20
  //   },
  //   dw: {
  //     dialect: 'postgres',
  //     host: '192.168.1.5',
  //     port: 5432,
  //     database: 'dw',
  //     user: 'ms',
  //     password: 'spiderdt',
  //     idleTimeoutMillis: 30000,
  //     connectionTimeoutMillis: 2000,
  //     max: 20
  //   }
  // },
  redis: {
    host: '127.0.0.1',
    port: 6379
  },
  push_keys: {
    access_key: 'secret_key'
  }
}