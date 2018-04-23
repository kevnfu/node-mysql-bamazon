require('dotenv').config();
let mysql = require('mysql');

const TABLE = 'products';
const COLUMNS = [
    'item_id', 
    'product_name', 
    'department_name', 
    'price', 
    'stock_quantity',
    'product_sales'
];

let conn = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: process.env.DB_PASSWORD,
  database: 'bamazon'
});

function connectPromise() {
  return new Promise((resolve, reject) => {
    conn.connect(function(err) {
      if(err) reject(err);
      resolve();
    });
  });
}

function queryPromise(...args) {
  return new Promise((resolve, reject) => {
    conn.query(...args, function(err, res) {
      if(err) reject(err);
      resolve(res);
    });
  })
}

exports.connect = connectPromise;
exports.query = queryPromise;
exports.end = conn.end.bind(conn);