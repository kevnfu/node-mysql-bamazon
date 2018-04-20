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
    },
    {
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
      },
      validate: function(ans) {
        return ans > 0;
      }
    },
    {
      name: 'quantity',
      message: 'Quantity?',
      filter: function(ans) {
        return parseInt(ans);
      },
      validate: function(ans) {
        return ans > 0;
      }
    }
  ]).then(function(ans) {
    return db.query(
      'INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES (?, ?, ?, ?)', 
      [ans.name, ans.department, ans.price, ans.quantity]);
  });
}