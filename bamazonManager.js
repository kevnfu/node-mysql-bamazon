const inquirer = require('inquirer');
const cTable = require('console.table');
const db = require('./database.js');

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
        return db
          .query('SELECT item_id, product_name, price, stock_quantity FROM products')
          .then(res => console.table(res));
      case 'low':
        return db
          .query('SELECT item_id, product_name, price, stock_quantity FROM products WHERE stock_quantity<5')
          .then(res => console.table(res));
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
  // close connection
  db.end();
}).catch(function(err) {
  console.log(err);
  throw err;
});

function addStock() {
  return inquirer.prompt([
    {
      name: 'id',
      message: 'Which product id?',
      filter: ans => parseInt(ans)
    },{
      name: 'amount',
      message: 'Add how much?',
      filter: ans => parseInt(ans)
    }
  ]).then(function(ans) {
    return db.query(
      'UPDATE products SET stock_quantity=stock_quantity + ? WHERE item_id = ?', 
      [ans.amount, ans.id]);
  })
}

function newProduct() {
  return inquirer.prompt([
    {
      name: 'name',
      message: 'Product name?'
    },{
      name: 'department',
      message: 'Department name?'
    },{
      name: 'price',
      message: 'Price?',
      filter: ans => parseFloat(ans),
      validate: ans => ans > 0 || 'Price must be greater than zero'
    },{
      name: 'quantity',
      message: 'Quantity?',
      filter: ans => parseInt(ans),
      validate: ans => ans > 0 || 'Quantity must be greater than zero'
    }
  ]).then(function(ans) {
    return db.query(
      'INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES (?, ?, ?, ?)', 
      [ans.name, ans.department, ans.price, ans.quantity]);
  });
}