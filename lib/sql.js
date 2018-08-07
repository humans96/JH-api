var mysql = require('mysql');
var pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'human',
  database: 'shop'
});

let formate = data => {
  let arr = data.split('?')[1].split('&')[0].split('=');
  return '`' + arr[0] + '`' + ' = "' + arr[1] + '"';
}

let sqlQuery = sql => {
  return new Promise(function (resolve, reject) {
    pool.getConnection(function (err, connection) {
      if (err) {
        reject(err);
        return;
      }
      connection.query(sql, function (error, res) {
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

let sqlInsert = (sql, data) => {
  return new Promise(function (resolve, reject) {
    pool.getConnection(function (err, connection) {
      if (err) {
        reject(err);
        return;
      }
      connection.query(sql, data, function (error, res) {
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



module.exports = {
  formate,
  sqlQuery,
  sqlInsert
}