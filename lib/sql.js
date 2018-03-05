var mysql = require('mysql');
var pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'human',
  database: 'shop'
});

module.exports = sql => {
  return new Promise(function (resolve, reject) {
    pool.getConnection(function (err, connection) {
      if (err) {
        reject(err);
        return;
      }
      connection.query(sql,function (error, res) {
        connection.release();
        if (error) {
          reject(error);
          return;
        }
        resolve(res);
      });
    });
  });
};