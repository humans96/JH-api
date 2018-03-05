const fetch = require('node-fetch');
// let { wechat_server_url } = require('../../config');
const formatParams = require('./tools/format_params');

const GET = 'GET';
const POST = 'POST';
const DELETE = 'DELETE';
const UPDATE = 'UPDATE';
const PUT = 'PUT';

const plain_object = Object.create(null);
const default_header = {
  'Content-Type': 'application/json'
};

module.exports = (url, meta = plain_object) => (data, ...appendToUrl) => {
  let method = GET;
  let server = 'wechat_server_url';
  let header = default_header;

  if(undefined === meta) {
    // do nothing
  }else if(typeof meta === 'string') {
    method = meta;
  }else {
    if(meta.method) {
      method = meta.method;
    }
    if(meta.header) {
      header = Object.assign({}, header, meta.header);
    }
    if(meta.server) {
      server = meta.server;
    }
  }

  if(method === GET && data) { // convert object to url parameters & append to extra urls
    appendToUrl.push(formatParams(data));
  }

  console.log(`${method}:\t${`${server}${url}${appendToUrl.join('')}`}`)
  return new Promise((f, r) => {
    fetch(`${server}${url}${appendToUrl.join('')}`, {
      method,
      body: method === GET ? undefined : JSON.stringify(data),
      headers: header
    }).then(res => {
      if(res.ok) {
        return meta.skip_json_parse ? res : res.json();
      }else {
        throw new Error(res);
      }
    }).then(res => {
      f(res);
    }).catch(res => {
      f(res);
    }).then(() => {
      f();
    });
  });
};