CREATE TABLE products (
    id SERIAL PRIMARY KEY, -- PostgreSQL
    -- id INT PRIMARY KEY AUTO_INCREMENT, -- MYSQL
    products_name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    description TEXT,
    image VARCHAR(255),
    amount_in_stock INT
);