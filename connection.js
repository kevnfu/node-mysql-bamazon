require('dotenv').config();
let mysql = require('mysql');

const COLUMNS = [
    'item_id', 
    'product_name', 
    'department_name', 
    'price', 
    'stock_quantity'
];

let conn = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: process.env.DB_PASSWORD,
  database: 'bamazon'
});

module.exports = conn;