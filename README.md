# node-mysql-bamazon

## Overview
App simulates an online store, backed by a mysql database. There are three different node apps, one for customers, one for managers, and one for supervisors

### Customer
Called with `node bamazonCustomer.js`. Shows all available products, and then asks what, and how much the customer wants to buy.
![alt text](images/customer1.png)
Total price is shown to the customer, and the database is updated. Quantity is decreased by how many units the customer purchased, and product_sales is increased by total price of order.
![alt text](images/customer2.png)
Attempting to purchase more units than are in stock results is not allowed.

### Manager
Called with `node bamazonManager.js`.

## Dependencies
`inquirer` for getting user input
`console.table` for displaying tables
`mysql` for accessing database
`dotenv` to hide database password