-- SELECT * FROM customers;
-- SELECT * FROM orders;

-- INSERT INTO customers(
--     first_name,
--     last_name,
--     email
-- )
-- VALUES(
--     'Jonas',
--     'Blue',
--     'jonas@test.com'
-- )

-- INSERT INTO orders(
--    amount_billed,
--    customer_id 
-- )
-- VALUES(
--     103.12
-- );

-- Start the transaction
BEGIN;

-- Insert a new customer
INSERT INTO customers (
    first_name,
    last_name,
    email
) VALUES (
    'Toni',
    'Pink',
    'toni@test.com'
);

-- Intentional mistake: Missing customer_id in the orders table
INSERT INTO orders (
   amount_billed,
   customer_id 
) VALUES (
    103.12, -- Add a valid customer_id to avoid errors
    -- (SELECT id FROM customers WHERE email = 'johhny@test.com')
);

-- Rollback all changes if any error occurs
-- ROLLBACK;
