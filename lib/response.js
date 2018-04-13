const success = data => ({
    status: 200,
    type: 'success',
    ...data
  });
  
  const request_error = data => ({
    status: 400,
    type: 'bad request',
    ...data,
  });
  
  const server_error = data => ({
    status: 500,
    type: 'server error',
    ...data,
  });
  
  const error = (status, type, data) => ({
    status, type, data
  })
  
  module.exports = {
    success,
    request_error,
    error,
    server_error
  }