DROP TABLE users;
DROP TABLE employers;
DROP TABLE conversation;


CREATE TYPE employment_status AS ENUM('employed', 'self-employed', 'unemployed'); -- PostgreSQL

CREATE TABLE users (
    id SERIAL PRIMARY KEY, -- PostgreSQL
    -- id INT PRIMARY KEY AUTO_INCREMENT, -- MYSQL
    first_name VARCHAR(200) NOT NULL,
    last_name VARCHAR(200) NOT NULL,
    full_name VARCHAR(401) GENERATED ALWAYS AS(CONCAT(first_name,' ',last_name)) STORED,
    yearly_salary INT CHECK (yearly_salary > 0),
    -- current_status ENUM('employed', 'self-employed', 'unemployed') -- MySQL
    current_status employment_status -- PostgreSQL
);

CREATE TABLE employers (
    id SERIAL PRIMARY KEY, -- PostgreSQL
    -- id INT PRIMARY KEY AUTO_INCREMENT, -- MYSQL
    company_name VARCHAR(300) NOT NULL,
    company_address VARCHAR(300) NOT NULL,
    yearly_revenue FLOAT CHECK (yearly_revenue > 0),
    is_hiring BOOLEAN DEFAULT FALSE
);

CREATE TABLE conversation (
    id SERIAL PRIMARY KEY, -- PostgreSQL
    -- id INT PRIMARY KEY AUTO_INCREMENT, -- MYSQL
    user_id INT,
    employer_id INT,
    message TEXT NOT NULL
);