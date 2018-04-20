DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  product_name VARCHAR(30),
  department_name VARCHAR(30),
  price DECIMAL(10,2),
  stock_quantity INT,
  product_sales INT DEFAULT 0
);

CREATE TABLE departments (
  department_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  department_name VARCHAR(30),
  over_head_costs INT
);

INSERT INTO departments (department_name, over_head_costs) 
VALUES ("Electronics", 1000);

INSERT INTO departments (department_name, over_head_costs) 
VALUES ("Garden", 500);

INSERT INTO departments (department_name, over_head_costs) 
VALUES ("Food", 2000);

INSERT INTO products 
(product_name, department_name, price, stock_quantity, product_sales) 
VALUES ("Generic shooting game", "Electronics", 60.99, 1000, 5000);

INSERT INTO products 
(product_name, department_name, price, stock_quantity, product_sales) 
VALUES ("Gadget", "Electronics", 30.00, 3, 60);

INSERT INTO products 
(product_name, department_name, price, stock_quantity) 
VALUES ("Shovel", "Garden", 10, 300);

INSERT INTO products 
(product_name, department_name, price, stock_quantity) 
VALUES ("Lawn Mower", "Garden", 79.99, 50);

INSERT INTO products 
(product_name, department_name, price, stock_quantity) 
VALUES ("Candy", "Food", 3, 5000);

INSERT INTO products 
(product_name, department_name, price, stock_quantity) 
VALUES ("Clam chowder", "Food", 7, 10);

INSERT INTO products 
(product_name, department_name, price, stock_quantity) 
VALUES ("Pizza", "Food", 10, 30);

INSERT INTO products 
(product_name, department_name, price, stock_quantity) 
VALUES ("Salmon", "Food", 30, 2);

INSERT INTO products 
(product_name, department_name, price, stock_quantity) 
VALUES ("Speakers", "Electronics", 300, 4);

INSERT INTO products 
(product_name, department_name, price, stock_quantity) 
VALUES ("Fertilizer", "Garden", 15, 1);


SELECT * FROM products;