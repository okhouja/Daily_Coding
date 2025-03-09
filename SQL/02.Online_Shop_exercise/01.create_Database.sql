-- Task 1: Create Database

-- CREATE DATABASE online_shop;

-- Task 2 + 3 : Create Table and configure table

-- CREATE TABLE products (
--     id SERIAL PRIMARY KEY, -- PostgreSQL
--     -- id INT PRIMARY KEY AUTO_INCREMENT, -- MYSQL
--     products_name VARCHAR(255) NOT NULL,
--     price NUMERIC(10, 2) NOT NULL,
--     description TEXT,
--     amount_in_stock SMALLINT,
--     image_path VARCHAR(500) -- 'upload/imafes/products/some-products.jpg'
-- );

-- Task 4: Inserting dummy data

-- INSERT INTO products (price, products_name, description ,amount_in_stock, image_path)
-- VALUES (
--     12.99,
--     'A Book',
--     'This is a book - and this text could be way longer!',
--     39,
--     'upload/images/products/a-book.jpg'
-- )

-- Task 5: Add constraints

ALTER TABLE products
-- MYSQL
MODIFY COLUMN products_name VARCHAR(200) NOT NULL,
MODIFY COLUMN price NUMERIC(10, 2) NOT NULL CHECK (price > 0),
MODIFY COLUMN description TEXT NOT NULL,
MODIFY COLUMN amount_in_stock SMALLINT CHECK (amount_in_stock >= 0);
-- PostgreSQL
-- ALTER COLUMN products_name SET NOT NULL,
-- ALTER COLUMN price SET NOT NULL,
-- ALTER COLUMN description SET NOT NULL,
-- ADD CONSTRAINT price_postive CHECK (price > 0),
-- ADD CONSTRAINT amount_in_stock CHECK (amount_in_stock >= 0);

-- Task 6: Add id column

ALTER TABLE products
ADD COLUMN id INT PRIMARY KEY AUTO_INCREMENT; -- MySQL
ADD COLUMN id SERIAL PRIMARY KEY; -- PostgreSQL