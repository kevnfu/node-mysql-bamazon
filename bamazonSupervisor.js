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
        {name: 'View Product Sales by Department', value: 'view'},
        {name: 'Create New Department', value: 'create'}
      ]
    }
  ]).then(function(ans) {
    switch(ans.option) {
      case 'view':
        return view();
      case 'create':
        return create();
    }
  })
}

function view() {
  return db.query(`
    SELECT department_id, departments.department_name, 
    SUM(product_sales) AS product_sales, over_head_costs, 
    SUM(product_sales) - over_head_costs AS total_profit
    FROM products
    RIGHT JOIN departments 
    ON products.department_name=departments.department_name
    GROUP BY departments.department_name`)
    .then(res => console.table(res));
}

function create() {
  return inquirer.prompt([
    {
      name: 'name',
      message: 'Department name?'
    },{
      name: 'overhead',
      message: 'Overhead costs?',
      filter: ans => parseFloat(ans)
    }
  ]).then(function(ans) {
    return db.query('INSERT INTO departments (department_name, over_head_costs) VALUES (?, ?)',
      [ans.name, ans.overhead]);
  });
}

db.connect().then(function() {
  return options();
}).then(function() {
  db.end();
}).catch(function(err) {
  console.log(err);
  throw err;
});