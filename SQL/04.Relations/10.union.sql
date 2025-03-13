-- SELECT * FROM users
-- WHERE id < 3
-- UNION
-- SELECT * FROM users
-- WHERE id > 8;

SELECT * FROM users
UNION
SELECT * FROM adresses;