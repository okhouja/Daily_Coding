-- CREATE DATABASE sales_example;

CREATE TABLE sales (
    id SERIAL PRIMARY KEY, -- Postgresql
    -- id INT PRIMARY KEY AUTO_INCREMENT, -- MySQL
    date_created DATE DEFAULT (CURRENT_DATE), --MySQL
    date_created DATE DEFAULT CURRENT_DATE, -- Postgresql
    date_fulfilled DATE,
    customer_name VARCHAR(300) NOT NULL,
    product_name VARCHAR(300) NOT NULL,
    volume NUMERIC(10, 3) NOT NULL CHECK (volume >= 0),
    is_recurring BOOLEAN DEFAULT FALSE,
    is_disputed BOOLEAN DEFAULT FALSE
    )