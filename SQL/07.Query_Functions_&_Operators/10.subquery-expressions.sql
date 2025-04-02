-- DROP TABLE customers;
-- DROP TABLE orders;

-- CREATE TABLE customers(
--     -- for mysql use this code
--     id INT PRIMARY KEY AUTO_INCREMENT,
--     -- for postgresql use this code
--     -- id SERIAL PRIMARY KEY,
--     first_name VARCHAR(200),
--     last_name VARCHAR(200),
--     email VARCHAR(200)
-- );

-- CREATE TABLE orders(
--     -- for mysql use this code
--     id INT PRIMARY KEY AUTO_INCREMENT,
--     -- for postgresql use this code
--     -- id SERIAL PRIMARY KEY,
--     amount_billed NUMERIC(5, 2),
--     customer_id INT REFERENCES customers
-- );

-- INSERT INTO customers(
--     first_name,
--     last_name,
--     email
-- )
-- VALUES(
--     'Max',
--     'Schwarz',
--     'max@test.com'
-- ),(
--     'Manu',
--     'Lorenz',
--     'manu@test.com'
-- ),(
--     'Julia',
--     'Meyers',
--     'juli@test.com'
-- );

-- INSERT INTO orders(
--    amount_billed,
--    customer_id 
-- )
-- VALUES(
--     48.99,
--     1
-- ), (
--     27.45,
--     2
-- ), (
--     19.49,
--     1
-- ), (
--     8.49,
--     3
-- );

-- SELECT first_name, last_name
-- FROM customers
-- WHERE email = 'max@test.com';

-- SELECT EXISTS(
--     SELECT first_name, last_name
--     FROM customers
--     WHERE email = 'max@test.com'
-- );

SELECT o.id
FROM orders AS o
WHERE EXISTS(
    SELECT c.email
    FROM customers AS c
    WHERE o.customer_id = c.id AND c.email = 'max@test.com'
);