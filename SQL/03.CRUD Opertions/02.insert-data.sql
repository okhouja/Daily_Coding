-- INSERT INTO sales (
--     customer_name,
--     product_name,
--     volume,
--     is_recurring
-- )
-- VALUES (
--     'John Doe',
--     'A BOOK',
--     12.99,
--     true
-- );

INSERT INTO sales (
    date_fulfilled,
    customer_name,
    product_name,
    volume,
    is_recurring,
    is_disputed
)
VALUES (
    NULL,
    'Learning Inc',
    'Course Bundle',
    4889.62,
    FALSE,
    FALSE
), (
    '2024-04-10',
    'Big Oil Inc',
    'Trucks',
    400000.0,
    FALSE,
    TRUE
);