let inquirer = require('inquirer');
let conn = require('./connection.js');

inquirer.prompt([
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
    case 'low':
    case 'add':
    case 'new':
  }
});