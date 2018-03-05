global.Promise = require('bluebird');
Promise.promisifyAll(require('fs'));

global.config = require('./config');

const cluster = require('cluster');
const { WORKER_NUM } = global.config;


const {
  SET_ACCESS_TOKEN,
  SET_JSAPI_TOKEN,
  PING_MASTER,
  handler
} = require('./src/cmd');

const workers = [];
global.broadcast = global.broadcast = msg => {
  workers.forEach(worker => worker.send(msg));
}

cluster.schedulingPolicy = cluster.SCHED_RR;
(async () => {
  if(cluster.isMaster) {
    // init websocket
    const server = require('http').createServer();
    await require('./src/ws')(server);
    server.listen(3011);
    console.log(`ws init on process #${process.pid} `);

    cluster.on('message', (worker, { cmd, data }) => {
      handler[cmd](global.io, data);
    });

    console.log(`init master process: #${process.pid}`);
    for (var i = 0; i < WORKER_NUM; i++) {
      const worker = cluster.fork();
      workers.push(worker);
    }
  }else if(cluster.isWorker) {
    // responding to message from master process
    process.on('message', ({ cmd, data }) => {
      if(!cmd) {
        return;
      }else {
        handler[cmd](data);
      }
    });
    process.send({ cmd: PING_MASTER });
    
    // init koa server
    const app = require('./src');
    app.listen(3010);
    console.log(`koa process #${process.pid} is ready`);
  }
})(); 