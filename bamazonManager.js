let inquirer = require('inquirer');
let db = require('./database.js');

const COLUMNS = [
    'item_id', 
    'product_name', 
    'department_name', 
    'price', 
    'stock_quantity'
];

function options() {
  return inquirer.prompt([
    {
      type: 'list',
      name: 'option',
      message: 'Options:',
      choices: [
        {name: 'View Products for Sale', value: 'products'},
        {name: 'View Low Inventory', value: 'low'},
        {name: 'Add to Inventory', value: 'add'},
        {name: 'Add New Product', value: 'new'}
      ]
    }
  ]).then(function(ans) {
    switch(ans.option) {
      case 'products':
        return db.query('SELECT item_id, product_name, price, stock_quantity FROM products');
      case 'low':
        return db.query('SELECT item_id, product_name, price, stock_quantity FROM products WHERE stock_quantity<5');
      case 'add':
        return addStock();
      case 'new':
        return newProduct();
    }
  });
}

db.connect().then(function() {
  return options();
}).then(function(res) {
  console.log(res);
  db.end();
});

function addStock() {

}

function newProduct() {
  return inquirer.prompt([
    {
      name: 'name',
      message: 'Product name?'
    },
    {
      name: 'department',
      message: 'Department name?'
    },
    {
      name: 'price',
      message: 'Price?',
      filter: function(ans) {
        return parseFloat(ans);
      }
      validate: function(ans) {
        return true;
      }
    },
    {
      name: 'quantity',
      message: 'Quantity?',
      filter: function(ans) {
        return parseInt(ans);
      },
      validate: function(ans) {
        return true;
      }
    }
  ]).then(function(ans) {
    return db.query('INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES (?, ?, ?, ?)', 
      [ans.name, ans.department, ans.price, ans.quantity]);
  });
}