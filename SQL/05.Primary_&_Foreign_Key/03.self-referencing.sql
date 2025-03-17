CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    supervisor_id INT,
    FOREIGN KEY (supervisor_id) REFERENCES employees(id) ON DELETE SET NULL
)