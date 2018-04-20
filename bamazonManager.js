let inquirer = require('inquirer');
let db = require('./database.js');

const COLUMNS = [
    'item_id', 
    'product_name', 
    'department_name', 
    'price', 
    'stock_quantity'
];

db.connect().then(function() {
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
  ]);
}).then(function(ans) {
  switch(ans.option) {
    case 'products':
      return db.query('SELECT item_id, product_name, price, stock_quantity FROM products');
    case 'low':
      return db.query('SELECT item_id, product_name, price, stock_quantity FROM products WHERE stock_quantity<5');
    case 'add':
    case 'new':
  }
}).then(function(res) {
  console.log(res);
  db.end();
});

