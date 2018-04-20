const inquirer = require('inquirer');
const cTable = require('console.table');
const db = require('./database.js');

// stores database values
let data;

function findById(id) {
  return data.find(e => e.item_id === parseInt(id));
}

// establish connection
db.connect().then(function() {
  // get data
  return db.query('SELECT * FROM products');
}).then(function(res) {
  // display products
  console.table(res);
  return res;
}).then(function(res) {
  // stash data globally (ugh)
  data = res;
  
  // ask for purchase details
  return inquirer.prompt([
    {
      name: 'id',
      message: 'ID?',
      validate: function(ans) {
        if(findById(ans) === undefined) {
          return 'Not a valid id.';
        } else {
          return true;
        }
      }
    },
    {
      name: 'units',
      message: function(ans) {
        return `How many units of "${findById(ans.id).product_name}" do you want to buy?`;
      },
      filter: ans => parseInt(ans),
      validate: ans => ans > 0 || "Not valid number"
    }
  ]);
}).then(function(ans) {
  // process order
  let item = findById(ans.id);
  if(item.stock_quantity >= ans.units) {
    // enough quantity, update database
    let totalCost = ans.units * item.price;
    db.query('UPDATE products SET ?,? WHERE ?',
      [
        {stock_quantity: item.stock_quantity - ans.units},
        {product_sales: item.product_sales + totalCost},
        {item_id: item.item_id}
      ]
    ).then(function(res) {
      console.log('Price:', totalCost);
    });
  } else {
    console.log('Not enough in stock.');
  }
  // close connection
  db.end();
}).catch(function(err) {
  console.log(err);
  throw err;
});