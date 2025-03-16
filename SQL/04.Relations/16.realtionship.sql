CREATE TABLE employees (
    id INT PRIMARY KEY AUTO_INCREMENT, -- MySQL
    -- id SERIAL PRIMARY KEY, -- PostgreSQL
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    bithday DATE NOT NULL,
    -- email VARCHAR(200) REFERENCES intranet_account ON DELETE ,
    email VARCHAR(200) UNIQUE NOT NULL
);

CREATE TABLE intranet_account (
        id INT PRIMARY KEY AUTO_INCREMENT, -- MySQL
    -- id SERIAL PRIMARY KEY, -- PostgreSQL
    email VARCHAR(200) REFERENCES employees (email) ON DELETE CASCADE,
    password VARCHAR(255) NOT NULL
);